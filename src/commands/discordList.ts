import { print, printHtml } from "kolmafia";
import { DiscordChat } from "../DiscordChat";
import { DiscordCommand } from "./iCommand";

export class DiscordList implements DiscordCommand {
  getHelp(): string[] {
    return ["Syntax: list", "List the links that have been setup"];
  }

  getName(): string {
    return "list";
  }

  shouldLinkExist(): "exist" | "unused" | null {
    return null;
  }

  getMinArgs(): number {
    return 0;
  }

  run(chat: DiscordChat, args: string[]): void {
    if (chat.links.length == 0) {
      print("You do not have any links active", "red");

      return;
    }

    chat.links.forEach((l) => {
      const data = [
        ["Link", l.name],
        ["Type", l.target],
        ["Data", l.data],
        ["Displayname", l.displayname],
        ["Avatar", l.avatar],
      ];

      printHtml(
        data
          .filter((l) => l[1] != null)
          .map(
            ([name, d]) =>
              `<font color='purple'>${name}:</font> <font color='${
                name != "Link" ? "blue" : "green"
              }'>${d}</font>`
          )
          .join("<br>&nbsp;&nbsp;- ")
      );
    });
  }
}
