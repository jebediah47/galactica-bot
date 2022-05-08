import { Command } from "../../interfaces";

export const command: Command = {
  name: "lock",
  aliases: [],
  run: (client, message) => {
    if (!message.member?.permissions.has("MANAGE_CHANNELS")) {
      return message.channel.send("You are not permitted to use this command!");
    }
    const everyone: any = message.guild?.roles.cache.find(
      (r) => r.name === "@everyone"
    );
    let channel = message.mentions.channels.first();
    if (!channel) channel = message.channel;

    if (channel.type === "GUILD_TEXT") {
      channel.permissionOverwrites.edit(everyone, {
        SEND_MESSAGES: false,
      });
      message.channel.send("🔒 The channel has been locked");
    }
  },
};
