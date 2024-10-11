import { print } from "kolmafia";
import { DiscordChat } from "../DiscordChat";
import { DiscordCommand } from "./iCommand";

export class DiscordDelete implements DiscordCommand {
  getHelp(): string[] {
    return ["Syntax: delete <name>", "Delete an existing link"];
  }

  getName(): string {
    return "delete";
  }

  shouldLinkExist(): "exist" | "unused" | null {
    return "exist";
  }

  getMinArgs(): number {
    return 1;
  }

  run(chat: DiscordChat, args: string[]): void {
    if (args.length > 1) {
      print("Too many args", "red");

      return;
    }

    const result = chat.getKmailAndWait("delete " + args[0]);

    if (!result.startsWith("Success!")) {
      print("Failure! " + result, "red");
      print(
        "Use 'update' to refresh the links this script knows about.",
        "gray"
      );

      return;
    }

    chat.links = chat.links.filter(
      (l) => l.name.toLowerCase() != args[0].toLowerCase()
    );
    chat.saveLinks();
    print(result, "green");
  }
}
