import type { ClientEvents } from "discord.js";
import type Client from "../client";

type Run<T extends keyof ClientEvents> = (
  client: Client,
  ...args: ClientEvents[T]
) => void;

export interface Event<T extends keyof ClientEvents> {
  name: T;
  run: Run<T>;
}
