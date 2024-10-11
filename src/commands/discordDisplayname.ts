import { print } from "kolmafia";
import { DiscordChat } from "../DiscordChat";
import { DiscordCommand } from "./iCommand";

export class DiscordDisplayname implements DiscordCommand {
  getHelp(): string[] {
    return [
      "Syntax: displayname <link name> <new url>",
      "Changes the displayname used in an existing webhook link",
    ];
  }

  getName(): string {
    return "displayname";
  }

  shouldLinkExist(): "exist" | "unused" | null {
    return "exist";
  }

  getMinArgs(): number {
    return 1;
  }

  run(chat: DiscordChat, args: string[]): void {
    if (args.length > 2) {
      print("Too many args provided", "red");

      return;
    }

    const link = chat.getLink(args[0]);

    if (link.target != "webhook") {
      print("Needs to be a link of type webhook", "red");

      return;
    }

    const result = chat.getKmailAndWait(
      "edit " + args[0] + " displayname " + (args[1] ?? "")
    );

    if (!result.startsWith("Success!")) {
      print("Failure! " + result, "red");

      return;
    }

    link.displayname = args[1] ?? null;
    chat.saveLinks();
    print(result, "green");
  }
}
