import { DiscordChat } from "../DiscordChat";

export interface DiscordCommand {
  getHelp(): string[];

  getName(): string;

  shouldLinkExist(): "exist" | "unused" | null;

  getMinArgs(): number;

  run(chat: DiscordChat, args: string[]): void;
}
