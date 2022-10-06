import { ApplicationCommandOptionType, EmbedBuilder } from "discord.js";
import { refreshConfigCache } from "../../functions";
import { Command } from "../../interfaces";

export const command: Command = {
  name: "setmusic",
  description: "Enables or disables music commands.",
  options: [
    {
      name: "mode",
      description: "Sets the mode",
      type: ApplicationCommandOptionType.String,
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
    if (!interaction.member.permissions.has("ManageGuild")) {
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
    const embed = new EmbedBuilder()
      .setColor("Random")
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
    await refreshConfigCache(client);
    await interaction.reply({ embeds: [embed] });
  },
};
