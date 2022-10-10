import { Command } from "../../interfaces";
import { EmbedBuilder } from "discord.js";
import axios from "axios";

export const command: Command = {
  name: "meme",
  description: "Sends you an EPIC meme!",
  run: async (client, interaction) => {
    const subReddits = [
      "r/meme",
      "r/memes",
      "r/terriblefacebookmemes",
      "r/dankmemes",
      "r/PewdiepieSubmissions",
      "r/MemeEconomy",
    ];
    function randomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    const randomIndex = randomInt(0, subReddits.length);
    function getRandomPost(posts: any) {
      const randomIndex = randomInt(0, posts.length);
      return posts[randomIndex].data;
    }
    await axios
      .get(`https://reddit.com/${subReddits[randomIndex]}/.json`)
      .then(async (resp) => {
        const {
          title,
          url,
          subreddit_name_prefixed: subreddit,
        } = getRandomPost(resp.data.data.children);
        const meme = new EmbedBuilder()
          .setTitle(`${title}`)
          .setURL(`${url}`)
          .setColor("Random")
          .setImage(`${url}`)
          .setFooter({ text: `From ${subreddit}` });

        await interaction.reply({ embeds: [meme] });
      });
  },
};
