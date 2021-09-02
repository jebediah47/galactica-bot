import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";

export const command: Command = {
  name: "github",
  aliases: [],
  run: async (client, message, args) => {
    const name = args.join(" ");
    if (!name) {
      const error = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Notice!")
        .setDescription("❎ Please provide a valid user")
        .setTimestamp();
      return message.channel.send({ embed: error });
    }

    const url = `https://api.github.com/users/${name}`;

    let response;
    try {
      response = await fetch(url).then((res) => res.json());
    } catch (err) {
      message.channel.send("An error occurred. " + err.message);
    }

    try {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${response.login}`)
        .setDescription(response.bio ? response.bio : "None")
        .addFields(
          {
            name: "💖 Followers",
            value: `\`\`\`${response.followers.toLocaleString()}\`\`\``,
            inline: true,
          },
          {
            name: "🏃 Following",
            value: `\`\`\`${response.following.toLocaleString()}\`\`\``,
            inline: true,
          },
          {
            name: "📚 Repositories",
            value: `\`\`\`${response.public_repos.toLocaleString()}\`\`\``,
            inline: true,
          },
          {
            name: "✉️ Email",
            value: `\`\`\`${response.email ? response.email : "None"}\`\`\``,
          },
          {
            name: "🏢 Company",
            value: `\`\`\`${
              response.company ? response.company : "None"
            }\`\`\``,
          },
          {
            name: "📍 Location",
            value: `\`\`\`${
              response.location ? response.location : "None"
            }\`\`\``,
          }
        )
        .setURL(response.html_url)
        .setThumbnail(response.avatar_url)
        .setTimestamp();

      message.channel.send(embed);
    } catch (err) {
      return message.channel.send(`❎ Please provide a valid user`);
    }
  },
};
