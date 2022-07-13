import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "setmodlogs",
  description: "Enables or disables mod-logs channel.",
  options: [
    {
      name: "mode",
      description: "Sets the mode",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "true",
          value: "true",
        },
        {
          name: "false",
          value: "false",
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    let bool = false;
    switch (args.get("mode")?.value) {
      case "true":
        bool = true;
        break;
      case "false":
        bool = false;
        break;
    }
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Set modlogsIsEnabled to \`${bool}\``)
      .setTimestamp();
    await client.prisma.guildConfigs.update({
      where: {
        guildID: `${interaction.guild?.id}`,
      },
      data: {
        modLogsIsEnabled: bool,
      },
    });
    interaction.reply({ embeds: [embed] });
  },
};
