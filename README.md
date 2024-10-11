# Discord Updates from KoL

Install this as a KoLMafia script with 
```
git checkout libraryaddict/DiscordChat release
```

Install this as a javascript library by running 
```
npm install kol-discord-api
```
to your built script.

This is easy to use as a library, but you can also use this via commandline with the script, or even forgo this entirely and send the message directly to `DiscordChat` via whisper/kmail.

Running the script `discord` provides a UI and helps make it easier to setup.

The script works by requesting responses as kmails, both for the increased message length and because it's more reliable because of how mafia handles chat. No need to make sure chat is running and a chat script is operating in the background.

You will notice a small delay after running each command as the script waits for the response and reads it. The response is then deleted, so that your inbox is not cluttered.
If you're curious what's being sent, you can turn off the deletion by setting `deleteDiscordKmails` to `false`

# What does this do?

This lets you send messages from KoL to discord, either by showing the messages in a channel using webhooks or by having the bot DM you directly.

This means you can have your wrapper script keep you up to date on the current progress of a task, or even ping you if something goes wrong!

But wait, couldn't you do this yourself? Short answer, yes. But only in channels by using webhooks.
Its basically just `visitUrl(data.url + "?payload_json=" + encodeURIComponent(json), true, true)`.
You will not be able to edit any messages as this requires `PATCH` in KoLMafia, which is not supported. So you can only send them.
You also cannot DM yourself, this requires an actual discord bot to be running.

The reason this only lets you setup DMs and webhooks is because it's both easier to setup on the user's end, and it is less of a security hassle.
This means you can always have the bot DM you, but if you want it to send messages in a channel then you need an admin to give you a webhook url, which they can revoke at any time.
This also means you don't need the bot in your server and it can't see anything in there. It can only do webhook stuff with the webhook you gave it.

# How do I send messages to DiscordChat?

You can send it via kmail or whisper, but if your message is bulky you will need to send it via kmail. But whisper works great! There's no difference in them, just that kmails has a slight delay and can support long messages.
If you're using this script however, switching between the two will be handled for you.

As a library, you will be integrating the `DiscordMessage` interface and passing that to `sendDiscord`, or if you're feeling braver, you can send the raw string instead.

# Getting Started - DM

This is as simple as either whispering the bot `/w DiscordChat add <name> dm`
Or running the script `discord add <name> dm` 

`default` is the default link name, but you can use other names (keep it simple, no spaces)

You will be sent a code, you then send the discord bot `Chat Relay#8293` the code. It's now set up!

# Getting Started - Webhooks

First you need a discord channel you will be sending these messages in.

After you have a channel, go into 
> `Edit Channel` > `Integrations` > `Webhooks` > `Create Webhook`

Copy the webhook URL and DM `DiscordChat` the following: `add <name> <url>`
Eg, `/w DiscordChat add final_profit https://discord.com/api/webhooks/12305433673743/ASDGijosfdoiuj-fhufdshuiSAHUI_3524d`

DiscordChat now knows where to send this.
You will probably want to configure the webhook so that it's not posting messages under "Spidey Bot" with the default avatar.

`default` is the default link name, but you can use other names (keep it simple, no spaces)

# How does pinging work?

So because pings don't work in embeds, the ping itself is sent outside the embed which doesn't look as cool unfortunately. `Pinging @Dinosaur!`

You want to copy your discord user ID and then format it as so it's `<@1234>` in your message, which also works in normal discord to ping yourself (Can test it if you're unsure)
This will tell discord who exactly to ping. You can also mention roles, not sure why I added support for that. `<@&12345>`

# The API

You will see an interface `DiscordMessage`, this has a few fields.

`message` this is the actual message that will be sent and is the only required field.
`title` Optional, The title that is used in the embed that is sent
`id` Optional, but will default to `default`. If the target link does not exist, this will not work.
`edit` Optional, if a message does not exist, will be sent as normal. Otherwise will edit a message that was previously sent in the same kol day. Does not contain spaces.
`color` Optional, this is a 6 char hex, 'ffffff'. But you can also use the names of colors as defined in html. This is optional.

You're calling the function `sendDiscord` with the interface, or passing it a raw string `Status: My adventures, 5 remain`
Raw messages are explained a few sections down.

So the final output in your code can look like this

```
sendDiscord({
    title: "Adventures",
    message: "My adventures remaining: " + myAdventures(),
    color: "blue",
    edit: "advs_remain",
    id: "status_channel"
})
```

```
sendDiscord("Status: My Adventures, 5 remain");
```

# Using the script

Just invoke the script `discord` but as args, provide the raw message as explained in the next section.

`discord Status: Hello, I am in your DMs, I have finished my run.`

# Raw Message Format

The format is
Example: `ID: <string without spaces> Color: <6 char hex, or color name> Edit: <string without spaces> Title: <Message> Status: <Message>`

You can omit all the fields but for `Status`.
Example: `Status: <Message>`

The order matters. Its regex and I'm not going to be more fancy.
Example: `Color: green ID: leg_after Title: The name be John Status: John Bond \\nThe serial killer`

For newlines, at least for whispers you need to use \\\\n for newlines, not sure if its kol or mafia breaking \\n. Probs kol.
I'd advise a space before and after \\\\n, kol likes to split long words and it's awkward if it tries to split `\n` into `\ n`

Use `ID` to edit previous messages that were sent under the same `ID` in the same KoL day.
If there was no message sent today under `ID` it will send a new one and edit that in the future.
So you can edit messages as you progress through your day.
IDs are forgotten at rollover, they should be simple strings with no spaces.

You DM the message to `DiscordChat`, or kmail it.
