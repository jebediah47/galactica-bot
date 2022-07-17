import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "setmusic",
  description: "Enables or disables music commands.",
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
    if (!interaction.member.permissions.has("MANAGE_GUILD")) {
      return interaction.reply("You are not permitted to use this command!");
    }
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
      .setDescription(`Set musicIsEnabled to \`${bool}\``)
      .setTimestamp();
    await client.prisma.guildConfigs.update({
      where: {
        guildID: `${interaction.guild?.id}`,
      },
      data: {
        musicIsEnabled: bool,
      },
    });
    interaction.reply({ embeds: [embed] });
  },
};
