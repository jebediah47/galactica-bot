import { Event } from "@/interfaces";

export const event: Event<"levelUp"> = {
  name: "levelUp",
  run: async (client, message, { userID, channelID, userLvl }) => {
    process.stdout.write(
      `User ${userID} has leveled up to level ${userLvl} ${channelID} \n`,
    );
  },
};
