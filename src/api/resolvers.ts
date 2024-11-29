import ExtendedClient from "@/client"

const resolvers = (client: ExtendedClient) => ({
  Mutation: {
    updatePresenceConfig: async (_: any, { input }: any) => {
      const { botPresence, botPresenceType } = input

      if (
        typeof botPresenceType === "number" &&
        (botPresenceType < 0 || botPresenceType > 6)
      ) {
        client.logger.error(
          "botPresenceType must be >= 0 and <= 6. Not updating presence.",
        )
      } else {
        client.configManager.set("botPresence", botPresence)
        client.configManager.set("botPresenceType", botPresenceType)

        client.presenceManager.setPresence(
          client.configManager.get("botPresence"),
          client.configManager.get("botPresenceType"),
        )
      }

      return {
        botPresence: client.configManager.get("botPresence"),
        botPresenceType: client.configManager.get("botPresenceType"),
      }
    },
  },
  Query: {
    getPresenceConfig: async () => {
      return {
        botPresence: client.configManager.get("botPresence"),
        botPresenceType: client.configManager.get("botPresenceType"),
      }
    },
  },
})

export default resolvers
