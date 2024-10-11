import { print, printHtml } from "kolmafia";
import { DiscordChat } from "../DiscordChat";
import { DiscordCommand } from "./iCommand";

export class DiscordAdd implements DiscordCommand {
  getHelp(): string[] {
    return [
      "Syntax: add <name> <type> <webhook url?>",
      "<name> should be 'default' to make this the default link, or an unused name",
      "<type> should be 'dm' or 'webhook'. DM will require you to DM the discord bot. Webhook requires a webhook url for a channel integration on discord, this requires some ownership in that channel.",
      "<webhook url> is the url if the type 'webhook' was used",
    ];
  }

  getName(): string {
    return "add";
  }

  shouldLinkExist(): "exist" | "unused" | null {
    return "unused";
  }

  getMinArgs(): number {
    return 3;
  }

  run(chat: DiscordChat, args: string[]): void {
    if (args.length > 3) {
      print("Too many args", "red");

      return;
    }

    if (!["dm", "webhook"].includes(args[1])) {
      print("Unrecognized link type " + args[1], "red");

      return;
    }

    if (args.length != (args[1] == "dm" ? 2 : 3)) {
      print(
        "Expected " +
          (args[1] == "dm" ? 2 : 3) +
          " args but received " +
          args.length,
        "red"
      );

      return;
    }

    if (chat.getLink(args[0]) != null) {
      print("The link " + args[0] + " already exists", "red");

      return;
    }

    if (
      args[1] == "webhook" &&
      !args[2].startsWith("https://discord.com/api/webhooks")
    ) {
      print(
        "Invalid webhook url provided, did not start with https://discord.com/api/webhooks",
        "red"
      );

      return;
    }

    const result = chat.getKmailAndWait(
      "add " +
        args[0] +
        " " +
        args[1] +
        (args[1] == "webhook" ? " " + args[2] : "")
    );

    if (!result.startsWith("Success!")) {
      print("Failure! " + result, "red");

      return;
    }

    chat.links.push({
      name: args[0],
      target: args[1],
      data: args[1] == "dm" ? "???" : args[2],
    });

    chat.saveLinks();

    const code = result.match(/Just send the code '(.+)' to the/);

    if (code != null) {
      printHtml(
        `<font color='green'>Success! Send the code <font color='purple'>${code[1]}</font> to the Discord Bot to finish this process. Run 'update' if you changed your mind to bring the script back in sync</font>`
      );
    } else {
      print(result, "green");
    }
  }
}
