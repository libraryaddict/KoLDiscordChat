import { print } from "kolmafia";
import { DiscordChat } from "../DiscordChat";
import { DiscordCommand } from "./iCommand";

export class DiscordRename implements DiscordCommand {
  getHelp(): string[] {
    return [
      "Syntax: rename <name> <new name>",
      "Renames an existing link to a new name"
    ];
  }

  getName(): string {
    return "rename";
  }

  shouldLinkExist(): "exist" | "unused" | null {
    return "exist";
  }

  getMinArgs(): number {
    return 2;
  }

  run(chat: DiscordChat, args: string[]): void {
    if (args.length > 2) {
      print("Too many args provided", "red");

      return;
    }

    if (chat.getLink(args[1]) != null) {
      print("The link '" + args[1] + "' already exists", "red");

      return;
    }

    const result = chat.getKmailAndWait("edit " + args[0] + " name " + args[1]);

    if (!result.startsWith("Success!")) {
      print("Failure! " + result, "red");

      return;
    }

    const link = chat.getLink(args[0]);
    link.name = args[1];
    chat.saveLinks();
    print(result, "green");
  }
}
