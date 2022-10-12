import { Command } from "../../interfaces";
import {
  ApplicationCommandOptionType,
  ChannelType,
  VoiceBasedChannel,
} from "discord.js";
import { Channel } from "diagnostics_channel";

export const command: Command = {
  name: "join",
  description: "Joins a voice channel specified by the user.",
  options: [
    {
      name: "channel",
      description: "The voice channel you want the bot to join",
      type: ApplicationCommandOptionType.Channel,
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    if (client.configs.get(interaction.guildId!)?.musicIsEnabled) {
      const voiceChannel =
        interaction.member.voice.channel || args.getChannel("channel")!;

      if (!interaction.member.voice.channel) {
        return interaction.reply({
          content: "You must be in a voice channel to use this command!",
        });
      }

      if (args.getChannel("channel")!.type !== ChannelType.GuildVoice) {
        return interaction.reply({
          content: "You must specify a voice channel!",
        });
      }

      await interaction.reply({ content: "Joined the voice channel!" });
      await client.distube.voices.join(voiceChannel as VoiceBasedChannel);
    }
  },
};
