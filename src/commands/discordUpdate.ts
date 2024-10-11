import { print } from "kolmafia";
import { DiscordChat } from "../DiscordChat";
import { DiscordCommand } from "./iCommand";

export class DiscordUpdate implements DiscordCommand {
  getHelp(): string[] {
    return ["Syntax: update", "Updates the links known to this script"];
  }

  getName(): string {
    return "update";
  }

  shouldLinkExist(): "exist" | "unused" | null {
    return null;
  }

  getMinArgs(): number {
    return 0;
  }

  run(chat: DiscordChat, args: string[]): void {
    const result = chat.getKmailAndWait("list");

    chat.links = [];

    if (!result.startsWith("You do not have any")) {
      for (const line of result.split(/[\r\n]+/)) {
        const match = line.match(
          /^Link: (.+), connected via '(.+)' with data '([^']+)'(?: and displayname '([^']+)')?(?: and avatar '([^']+)')?$/
        );

        if (match == null) {
          print(
            "Found invalid text '" + line + "' when trying to parse link",
            "red"
          );
          continue;
        }

        chat.links.push({
          name: match[1],
          target: match[2],
          data: match[3] ? match[3] : null,
          displayname: match[4] ? match[4] : null,
          avatar: match[5] ? match[5] : null,
        });
      }
    }

    chat.saveLinks();

    print("Links Updated. You have " + chat.links.length + " active", "green");
  }
}
