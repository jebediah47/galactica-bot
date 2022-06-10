import { Command } from "../../interfaces";

export const command: Command = {
  name: "nickname",
  description: "Enables you to change other's nicknames.",
  options: [
    {
      name: "user",
      description: "The user to have his nickname changed",
      type: "USER",
      required: true,
    },
    {
      name: "nickname",
      description: "The new nickname to be set",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const user: any = args.getMember("user") || interaction.member;
    const nickname = args.getString("nickname");
    if (!user || !nickname) return;
    interaction.reply(`Changed the username of ${user} to ${nickname}`);
    await user.setNickname(nickname);
  },
};
