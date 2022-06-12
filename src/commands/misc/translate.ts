import translate from "@iamtraction/google-translate";
import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "translate",
  description: "Translates inputted data with Google Translate.",
  options: [
    {
      name: "data",
      description: "Data to be translated",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const query = args.getString("data");
    if (!query) return;
    try {
      const translated = await translate(query.toString(), { to: "en" });
      const embed2 = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("**This Translates to:**")
        .setDescription(translated.text)
        .setTimestamp();

      await interaction.reply({ embeds: [embed2] });
    } catch (err) {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${err}`)
        .setTimestamp();
      return interaction.reply({ embeds: [embed] });
    }
  },
};
