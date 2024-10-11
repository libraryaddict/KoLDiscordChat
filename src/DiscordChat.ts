import {
  bufferToFile,
  chatPrivate,
  entityEncode,
  fileToBuffer,
  getProperty,
  print,
  printHtml,
  visitUrl,
  waitq,
} from "kolmafia";
import { DiscordCommand } from "./commands/iCommand";
import { DiscordAdd } from "./commands/discordAdd";
import { DiscordDelete } from "./commands/discordDelete";
import { DiscordList } from "./commands/discordList";
import { DiscordRename } from "./commands/discordRename";
import { DiscordUpdate } from "./commands/discordUpdate";
import { DiscordWebhook } from "./commands/discordWebhook";
import { sendDiscord } from "./api/DiscordMessage";
import { DiscordAvatar } from "./commands/discordAvatar";
import { DiscordDisplayname } from "./commands/discordDisplayname";

interface Kmail {
  id: string;
  type: "normal" | "giftshop";
  azunixtime: string;
  localtime: string;
  fromid: string;
  fromname: string;
  message: string;
}

interface DiscordLink {
  name: string;
  target: string;
  data: string;
  avatar?: string;
  displayname?: string;
}

const targetPlayer = "DiscordChat";

export class DiscordChat {
  links: DiscordLink[] = [];
  commands: DiscordCommand[];

  constructor() {
    this.loadLinks();
    this.commands = [
      new DiscordAdd(),
      new DiscordDelete(),
      new DiscordList(),
      new DiscordRename(),
      new DiscordUpdate(),
      new DiscordWebhook(),
      new DiscordAvatar(),
      new DiscordDisplayname(),
    ];
  }

  handleCommand(command: string) {
    const split = command.split(" ");
    const action = split[0].toLowerCase();

    if (action == "help") {
      print(
        "If you do not wish for the kmails to be deleted, set `deleteDiscordKmails` to false",
        "gray"
      );

      for (let a = 0; a < this.commands.length; a++) {
        const command = this.commands[a];
        const lines = command.getHelp();

        printHtml(
          (a == 0 ? "" : "<br>") +
            "<font color='purple'>Command: </font>" +
            command.getName()
        );

        for (let i = 0; i < lines.length; i++) {
          printHtml(
            "&nbsp;&nbsp;" +
              "<font color=" +
              (i != 0 ? "gray" : "blue") +
              ">" +
              entityEncode(lines[i]) +
              "</font>"
          );
        }
      }

      return;
    } else {
      for (const command of this.commands) {
        if (action != command.getName()) {
          continue;
        }

        if (
          command.shouldLinkExist() == "exist" &&
          (split.length == 1 || this.getLink(split[1]) == null)
        ) {
          if (split.length > 1) {
            print("That link name does not exist", "red");
          } else {
            print("Please provide a name of an existing link", "red");
          }

          print(
            "Use 'update' to refresh the links this script knows about.",
            "gray"
          );

          return;
        } else if (
          command.shouldLinkExist() == "unused" &&
          (split.length == 1 || this.getLink(split[1]) != null)
        ) {
          if (split.length > 1) {
            print("The name '" + split[1] + "' is already in use", "red");
          } else {
            print("Please provide an unused link name", "red");
          }

          print(
            "Use 'update' to refresh the links this script knows about.",
            "gray"
          );

          return;
        }

        if (command.getMinArgs() >= split.length) {
          print("Not enough arguments were provided for this command", "red");
          print(command.getHelp()[0], "blue");

          return;
        }

        command.run(this, split.slice(1));

        return;
      }
    }

    print("I did not understand that, try 'help'", "red");
  }

  getLink(name: string) {
    return this.links.find((l) => l.name.toLowerCase() == name.toLowerCase());
  }

  saveLinks() {
    bufferToFile(JSON.stringify(this.links).toString(), "discord_links.txt");
  }

  loadLinks() {
    const buffer = fileToBuffer("discord_links.txt");

    if (!buffer.startsWith("[")) {
      return;
    }

    this.links = JSON.parse(buffer);
  }

  getKmailAndWait(message: string): string {
    const kmails = this.getKmails();
    const toBeatId = kmails.length > 0 ? parseInt(kmails[0].id) : 0;

    chatPrivate(targetPlayer, "kmail." + message);

    for (let i = 0; i < 5; i++) {
      waitq(1);

      const kmails = this.getKmails();

      const newKmail = kmails.find(
        (k) =>
          k.fromname.toLowerCase() == targetPlayer.toLowerCase() &&
          parseInt(k.id) > toBeatId
      );

      if (newKmail == null) {
        continue;
      }

      this.deleteBotKmails(newKmail, kmails);

      return newKmail.message;
    }

    // Failed to get kmail
    throw "Failed to contact and receive a kmail " + targetPlayer;
  }

  deleteBotKmails(latestKmail: Kmail, kmails: Kmail[]) {
    if (getProperty("deleteDiscordKmails") == "false") {
      return;
    }

    kmails = kmails.filter(
      (k) => k.fromname.toLowerCase() == targetPlayer.toLowerCase()
    );

    if (kmails.length == 0) {
      return;
    }

    // Only do the last kmail
    kmails = [latestKmail];

    visitUrl(
      "messages.php?the_action=delete&box=Inbox&pwd&" +
        kmails.map((k) => "sel" + k.id + "=on").join("&")
    );
  }

  getKmails(): Kmail[] {
    const buffer = visitUrl("api.php?pwd&what=kmail&for=DiscordChatApi");

    return JSON.parse(buffer);
  }
}

export function main(command: string = "help") {
  if (command.match(/(^| )Status: (.+)/)) {
    sendDiscord(command);
  } else {
    new DiscordChat().handleCommand(command);
  }
}
