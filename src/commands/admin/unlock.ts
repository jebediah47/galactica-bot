import { ApplicationCommandOptionType, Role } from "discord.js";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "unlock",
  description: "Unlocks a locked channel.",
  options: [
    {
      name: "channel",
      description: "Channel name",
      type: ApplicationCommandOptionType.Channel,
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has("ManageChannels")) {
      return interaction.reply({
        content: "You are not permitted to use this command!",
      });
    }
    const everyone: Role | undefined = interaction.guild?.roles.cache.find(
      (r) => r.name === "@everyone"
    );
    let channel: any = args.getChannel("channel");
    if (!channel) channel = interaction.channel;
    if (channel.type === "GUILD_TEXT") {
      channel.permissionOverwrites.edit(everyone, {
        SEND_MESSAGES: true,
      });
      await interaction.reply({ content: "🔓 The channel has been unlocked" });
    }
  },
};
