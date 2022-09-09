import { refreshConfigCache } from "../../functions";
import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "setmodlogschannelid",
  description: "Sets the mod-logs channel name",
  options: [
    {
      name: "name",
      description: "The mod-logs channel name, MUST BE UNIQUE",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
      return interaction.reply("You are not permitted to use this command!");
    }
    const embed = new MessageEmbed()
      .setColor("RANDOM")
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
      refreshConfigCache(client);
      interaction.reply({ embeds: [embed] });
    } else {
      return interaction.reply({
        content:
          "modLogsIsEnabled database value is false, to enable run `/setmodlogs`",
      });
    }
  },
};
