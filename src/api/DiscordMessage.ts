import { print, entityEncode, visitUrl, chatPrivate } from "kolmafia";

export interface DiscordMessage {
  color?: string; // 6 char hex, or html color name.
  id?: string; // 20 char limit, KOL limitations.
  edit?: string; // 20 char limit, KOL limitations.
  title?: string; // The title used in the embed
  message: string; // The message to show. If you want to ping someone (Please only yourself), then you need your discord user ID. Then use <@12341234> which will mention you.
}

const targetPlayer = "DiscordChat";

export function sendDiscord(message: DiscordMessage | string) {
  const toJoin: string[] = [];

  // If message type is not string
  if (!(typeof message == "string")) {
    if (message.color != null) {
      toJoin.push("Color: " + message.color);
    }

    if (message.id != null) {
      toJoin.push("ID: " + message.id);
    }

    if (message.title != null) {
      toJoin.push("Title: " + message.title);
    }

    if (message.edit != null) {
      toJoin.push("Edit: " + message.edit);
    }

    toJoin.push("Status: " + message.message);
  } else if (!message.match(/(^| )Status: (.+)/)) {
    print(
      "Tried to send invalid string for the webhook integration with " +
        targetPlayer +
        ": " +
        message,
      "red"
    );

    return;
  }

  const toSend = toJoin.length > 0 ? toJoin.join(" ") : (message as string);

  if (entityEncode(toSend).length >= 190) {
    // Send via kmail, it is too big
    visitUrl(
      "sendmessage.php?pwd=&action=send&towho=" +
        targetPlayer +
        "&message=" +
        entityEncode(toSend) +
        "&savecopy=on&sendmeat=0"
    );
  } else {
    chatPrivate(targetPlayer, toSend);
  }
}
