import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { refreshConfigCache } from "@/functions";
import { Command } from "@/interfaces";

export const command: Command = {
  name: "setmodlogschannelid",
  description: "Sets the mod-logs channel name",
  options: [
    {
      name: "name",
      description: "The mod-logs channel name, MUST BE UNIQUE",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has("ManageChannels")) {
      return interaction.reply("You are not permitted to use this command!");
    }
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(`Set modlogsChannelID to \`${args.getString("name")}\``)
      .setTimestamp();

    if (client.configs.get(interaction.guildId!)?.modLogsIsEnabled) {
      await client.prisma.guildConfigs.update({
        where: {
          guildID: `${interaction.guild?.id}`,
        },
        data: {
          modLogsChannelID: args.getString("name"),
        },
      });
      await refreshConfigCache(client);
      await interaction.reply({ embeds: [embed] });
    } else {
      return interaction.reply({
        content:
          "modLogsIsEnabled database value is false, to enable run `/setmodlogs`",
      });
    }
  },
};
