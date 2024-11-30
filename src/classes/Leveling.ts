import type ExtendedClient from "@/client"
import type { ExtendedInteraction } from "@/interfaces"
import type { LevelModel, PrismaClient } from "@prisma/client"
import type { Message, Snowflake } from "discord.js"

export class Leveling {
  private _prisma: PrismaClient
  private _client: ExtendedClient

  public constructor(prisma: PrismaClient, client: ExtendedClient) {
    this._prisma = prisma
    this._client = client
  }

  private getRandomXp(message: Message): number {
    const msgLength = message.content.length
    const xp = Math.floor(msgLength / 2)
    return Math.min(xp, 50)
  }

  private async createXpUser(
    userID: Snowflake,
    guildID: Snowflake,
    xp?: number,
  ): Promise<void> {
    await this._prisma.levelModel.create({
      data: {
        userID: userID,
        guildID: guildID,
        xp: BigInt(xp || 0),
        level: 0,
      },
    })
  }

  private async findXpUser(
    userID: Snowflake,
    guildID: Snowflake,
  ): Promise<LevelModel | null> {
    const userLevel = await this._prisma.levelModel.findFirst({
      where: { userID: userID, guildID: guildID },
    })

    if (!userLevel) {
      return null
    }

    return userLevel
  }

  private async getUserLevel(
    guildID: Snowflake,
    userID: Snowflake,
  ): Promise<number | null> {
    const userLevel = await this.findXpUser(guildID, userID)

    if (!userLevel) {
      return null
    }

    return userLevel.level
  }

  private async getUserXp(
    userID: Snowflake,
    guildID: Snowflake,
  ): Promise<number | null> {
    const userLevel = await this.findXpUser(guildID, userID)

    if (!userLevel) {
      return null
    }

    return Number(userLevel.xp)
  }

  public async giveXp(message: Message): Promise<void> {
    const randomXP = this.getRandomXp(message)
    const userID = message.author.id
    const guildID = message.guild!.id
    const channelID = message.channel.id

    const userLevel = await this.findXpUser(userID, guildID)

    if (!userLevel) {
      await this.createXpUser(userID, guildID, randomXP)
    } else {
      const newXP = Number(userLevel.xp) + randomXP
      let userLvl = userLevel.level
      const baseXP = 100
      const factor = 1.3

      // Calculate the XP required to reach the next level
      const xpToLevelUp = Math.floor(baseXP * (userLvl ^ factor))

      if (newXP >= xpToLevelUp) {
        userLvl += 1
        this._client.logger.info(
          `User ${userID} has leveled up to level ${userLvl} ${channelID} \n`,
        )
        await message.reply(`You've leveled up to level ${userLvl}!`)
      }

      await this._prisma.levelModel.update({
        where: { id: userLevel.id },
        data: {
          xp: BigInt(newXP),
          level: userLvl,
        },
      })
    }
  }

  public async getUserStats(interaction: ExtendedInteraction) {
    const userID = interaction.user.id
    const guildID = interaction.guild!.id

    const userLevel = await this.getUserLevel(userID, guildID)
    const userXp = await this.getUserXp(userID, guildID)

    if (!userXp || userXp < 25) {
      await interaction.reply({
        content: "You don't have enough XP to run this command!",
        ephemeral: true,
      })
    }

    return {
      level: Number(userLevel),
      xp: Number(userXp),
    }
  }
}
