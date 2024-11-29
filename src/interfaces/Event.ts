import { ClientEvents } from "discord.js"
import Client from "../client"

interface Run<T extends keyof ClientEvents> {
  (client: Client, ...args: ClientEvents[T]): void
}

export interface Event<T extends keyof ClientEvents> {
  name: T
  run: Run<T>
}
