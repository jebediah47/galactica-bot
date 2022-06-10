import { Command } from "../../interfaces";

export const command: Command = {
  name: "resetnickname",
  description: "Resets any users nickname to hist original username.",
  options: [
    {
      name: "user",
      description: "The user to have his nickname reset",
      type: "USER",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const user: any = args.getMember("user");
    if (!user) return;
    interaction.reply(`Resetted ${user}'s nickname`);
    await user.setNickname(null);
  },
};
