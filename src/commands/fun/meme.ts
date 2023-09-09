import { Command } from "../../interfaces";
import { EmbedBuilder } from "discord.js";
import axios from "axios";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPost(posts: string | any[]) {
  const randomIndex = randomInt(0, posts.length);
  return posts[randomIndex].data;
}

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
    const randomIndex = randomInt(0, subReddits.length);

    await axios
      .get(`https://reddit.com/${subReddits[randomIndex]}/.json`)
      .then(async (response) => {
        const { url, ups, title, permalink, num_comments } = getRandomPost(
          response.data.data.children,
        );
        const meme = new EmbedBuilder()
          .setTitle(`${title}`)
          .setURL(`https://reddit.com${permalink}`)
          .setColor("Random")
          .setImage(`${url}`)
          .setFooter({ text: `👍 ${ups} 💬 ${num_comments}` });

        await interaction.reply({ embeds: [meme] });
      });
  },
};
