import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import got from "got";

export const command: Command = {
  name: "meme",
  aliases: ["meem"],
  run: (client, message) => {
    const embed = new MessageEmbed();
    got("https://www.reddit.com/r/memes/random/.json").then((response) => {
      const content = JSON.parse(response.body);
      const permalink = content[0].data.children[0].data.permalink;
      const memeUrl = `https://reddit.com${permalink}`;
      const memeImage = content[0].data.children[0].data.url;
      const memeTitle = content[0].data.children[0].data.title;
      const memeUpvotes = content[0].data.children[0].data.ups;
      const memeDownvotes = content[0].data.children[0].data.downs;
      const memeNumComments = content[0].data.children[0].data.num_comments;
      embed.setTitle(`${memeTitle}`);
      embed.setURL(`${memeUrl}`);
      embed.setImage(memeImage);
      embed.setColor("RANDOM");
      embed.setFooter(
        `👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`
      );
      message.channel.send({ embeds: [embed] });
    });
  },
};
