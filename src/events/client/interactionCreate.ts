import { Event, ExtendedInteraction } from "@/interfaces"
import { CommandInteractionOptionResolver, Interaction } from "discord.js"

export const event: Event<"interactionCreate"> = {
  name: "interactionCreate",
  run: (client, message: Interaction) => {
    if (message.isCommand()) {
      const command = client.commands.get(message.commandName)
      if (!command)
        return message.followUp("You have used a non existent command")
      const args = message.options as CommandInteractionOptionResolver
      const interaction = message as ExtendedInteraction
      command.run(client, interaction, args)
    }
  },
}
