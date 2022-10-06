import { Command } from "../../interfaces";
import {
  ApplicationCommandOptionType,
  GuildTextBasedChannel,
} from "discord.js";

export const command: Command = {
  name: "play",
  description: "Plays a song on the voice channel you are currently talking.",
  options: [
    {
      name: "song",
      description: "Any song name or url",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    if (client.configs.get(interaction.guildId!)?.musicIsEnabled) {
      if (!interaction.member.voice.channel) {
        return interaction.reply({
          content: "You must be in a voice channel to use this command!",
        });
      }
      const music = args.getString("song");
      if (!music) return;
      await interaction.deferReply();
      await client.distube.play(interaction.member.voice.channel, music, {
        member: interaction.member,
        textChannel: interaction.channel as GuildTextBasedChannel,
      });
      await interaction.editReply({ content: "Added a song to the queue!" });
    } else {
      return interaction.reply({
        content: "Music commands have been disabled by the owner.",
      });
    }
  },
};
