import { Command } from "../../interfaces";

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
    if (client.config.MUSIC_IS_ENABLED) {
      if (!interaction.member.voice.channel) {
        return interaction.reply({
          content: "You must be in a voice channel to use this command!",
        });
      }
      const music = args.getString("song");
      if (!music) return;
      if (interaction.channel?.type === "GUILD_TEXT") {
        client.distube?.play(interaction.member.voice.channel, music, {
          member: interaction.member,
          textChannel: interaction.channel,
        });
        await interaction.reply({ content: "Added a song to the queue!" });
      }
    } else {
      return interaction.reply({
        content: "Music commands have been disabled by the owner.",
      });
    }
  },
};
