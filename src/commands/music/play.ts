import { Command } from "../../interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
  name: "play",
  description: "Plays a song on the voice channel you are currently talking.",
  options: [
    {
      name: "song",
      description: "Any song name or url",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    if (!interaction.member.voice.channel) {
      const noVoiceChannel = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("❌ Error!")
        .setDescription("You must be in a voice channel to use this command!")
        .setTimestamp();
      return interaction.reply({ embeds: [noVoiceChannel] });
    }
    const music = args.getString("song");
    if (!music) return;
    const success = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription("Added a song to the queue!");
    if (interaction.channel?.type === "GUILD_TEXT") {
      client.distube?.play(interaction.member.voice.channel, music, {
        member: interaction.member,
        textChannel: interaction.channel,
      });
      await interaction.reply({ embeds: [success] });
    }
  },
};
