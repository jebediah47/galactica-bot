import { gql } from "@elysiajs/apollo"

export const schema = gql`
  type PresenceConfig {
    botPresence: String
    botPresenceType: Int
  }

  input UpdatePresenceConfig {
    botPresence: String
    botPresenceType: Int
  }

  type Mutation {
    updatePresenceConfig(input: UpdatePresenceConfig!): PresenceConfig
  }

  type Query {
    getPresenceConfig: PresenceConfig
  }
`
