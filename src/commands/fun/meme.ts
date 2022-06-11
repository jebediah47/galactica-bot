import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import randomPuppy from "random-puppy";

export const command: Command = {
  name: "meme",
  description: "Sends you an EPICO meme!",
  run: async (client, interaction) => {
    const subReddits = ["meme", "memes", "raimimemes", "terriblefacebookmemes"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const image = await randomPuppy(random);
    const meme = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Here is your meme from r/${random}`)
      .setURL(`https://reddit.com/r/${random}`)
      .setImage(image)
      .setTimestamp();
    await interaction.reply({ embeds: [meme] });
  },
};
