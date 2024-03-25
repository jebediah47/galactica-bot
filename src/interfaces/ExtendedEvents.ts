import { ClientEvents, Message, Snowflake } from "discord.js";

export interface ExtendedEvents extends ClientEvents {
  levelUp: [
    message: Message,
    { userID: string; channelID: Snowflake; userLvl: number },
  ];
}
