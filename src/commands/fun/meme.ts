import { Command } from "../../interfaces";
import { EmbedBuilder } from "discord.js";
import got from "got";

export const command: Command = {
  name: "meme",
  description: "Sends you an EPIC meme!",
  run: async (client, interaction) => {
    const subReddits = [
      "meme",
      "memes",
      "terriblefacebookmemes",
      "dankmemes",
      "PewdiepieSubmissions",
      "MemeEconomy",
    ];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    await got(`https://www.reddit.com/r/${random}/random/.json`).then(
      async (response) => {
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;

        const permalink = post.data.permalink;
        const memeUrl = `https://reddit.com${permalink}`;
        const memeImage = post.data.url;
        const memeTitle = post.data.title;
        const memeUpvotes = post.data.ups;
        const memeNumComments = post.data.num_comments;
        const meme = new EmbedBuilder()
          .setTitle(`${memeTitle}`)
          .setURL(`${memeUrl}`)
          .setColor("Random")
          .setImage(memeImage)
          .setFooter({
            text: `👍 ${memeUpvotes} 💬 ${memeNumComments}`,
          });

        await interaction.reply({ embeds: [meme] });
      }
    );
  },
};
