import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";
import axios from "axios";

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
      return message.channel.send({ embeds: [error] });
    }

    try {
      const { data }: any = await axios.get(
        `https://api.github.com/users/${name}`
      );
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${data.login}`)
        .setDescription(data.bio ? data.bio : "None")
        .addFields(
          {
            name: "💖 Followers",
            value: `\`\`\`${data.followers.toLocaleString()}\`\`\``,
            inline: true,
          },
          {
            name: "🏃 Following",
            value: `\`\`\`${data.following.toLocaleString()}\`\`\``,
            inline: true,
          },
          {
            name: "📚 Repositories",
            value: `\`\`\`${data.public_repos.toLocaleString()}\`\`\``,
            inline: true,
          },
          {
            name: "✉️ Email",
            value: `\`\`\`${data.email ? data.email : "None"}\`\`\``,
          },
          {
            name: "🏢 Company",
            value: `\`\`\`${data.company ? data.company : "None"}\`\`\``,
          },
          {
            name: "📍 Location",
            value: `\`\`\`${data.location ? data.location : "None"}\`\`\``,
          }
        )
        .setURL(data.html_url)
        .setThumbnail(data.avatar_url)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      message.channel.send("An error occurred. " + err.message);
    }
  },
};
