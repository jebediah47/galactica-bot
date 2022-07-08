import { Command } from "../../interfaces";

export const command: Command = {
  name: "lock",
  description: "Locks a locked channel.",
  options: [
    {
      name: "channel",
      description: "Channel name",
      type: "CHANNEL",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
      return interaction.reply({
        content: "You are not permitted to use this command!",
      });
    }
    const everyone: any = interaction.guild?.roles.cache.find(
      (r) => r.name === "@everyone"
    );
    let channel: any = args.getChannel("channel");
    if (!channel) channel = interaction.channel;
    if (channel.type === "GUILD_TEXT") {
      channel.permissionOverwrites.edit(everyone, {
        SEND_MESSAGES: false,
      });
      await interaction.reply({ content: "🔒 The channel has been locked" });
    }
  },
};
