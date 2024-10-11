import { print } from "kolmafia";
import { DiscordChat } from "../DiscordChat";
import { DiscordCommand } from "./iCommand";

export class DiscordWebhook implements DiscordCommand {
  getHelp(): string[] {
    return [
      "Syntax: webhook <link> <new url>",
      "Changes the webhook used in an existing link",
    ];
  }

  getName(): string {
    return "webhook";
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

    const link = chat.getLink(args[0]);

    if (link.target != "webhook") {
      print("Needs to be a link of type webhook", "red");

      return;
    }

    const result = chat.getKmailAndWait(
      "edit " + args[0] + " target " + args[1]
    );

    if (!result.startsWith("Success!")) {
      print("Failure! " + result, "red");

      return;
    }

    link.data = args[1];
    chat.saveLinks();
    print(result, "green");
  }
}
