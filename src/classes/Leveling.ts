import { LevelModel, PrismaClient } from "@prisma/client";
import { Message } from "discord.js";
import ExtendedClient from "@/client";

export class Leveling {
  private _prisma: PrismaClient;
  private _client: ExtendedClient;

  public constructor(client: ExtendedClient, prisma: PrismaClient) {
    this._prisma = prisma;
    this._client = client;
  }
  private getRandomXp(message: Message): number {
    const msgLength = message.content.length;
    const xp = Math.floor(msgLength / 2);
    return Math.min(xp, 50);
  }

  private async createXpUser(
    userID: string,
    guildID: string,
    xp: number,
  ): Promise<void> {
    await this._prisma.levelModel.create({
      data: {
        userID: userID,
        guildID: guildID,
        xp: BigInt(xp),
        level: 0,
      },
    });
  }

  public async giveXp(message: Message): Promise<void> {
    const randomXP = this.getRandomXp(message);
    const userID = message.author.id;
    const guildID = message.guild!.id;
    const channelID = message.channel.id;
    const userLevel = await this._prisma.levelModel.findFirst({
      where: { userID: userID, guildID: guildID },
    });

    if (!userLevel) {
      await this.createXpUser(userID, guildID, randomXP);
    } else {
      const newXP = Number(userLevel.xp) + randomXP;
      let userLvl = userLevel.level;
      const baseXP = 100;
      const factor = 1.3;

      // Calculate the XP required to reach the next level
      const xpToLevelUp = Math.floor(baseXP * (userLvl ^ factor));

      if (newXP >= xpToLevelUp) {
        userLvl += 1;
        this._client.emit("levelUp", { userID, channelID, userLvl });
      }

      await this._prisma.levelModel.update({
        where: { id: userLevel.id },
        data: {
          xp: BigInt(newXP),
          level: userLvl,
        },
      });
    }
  }

  public async getUserLevel(
    guildID: string,
    userID: string,
  ): Promise<LevelModel | null> {
    const userLevel = await this._prisma.levelModel.findFirst({
      where: { userID: userID, guildID: guildID },
    });

    if (!userLevel) {
      return null;
    }

    return userLevel;
  }
}
