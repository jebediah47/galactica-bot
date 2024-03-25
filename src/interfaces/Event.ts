import Client from "../client";
import { ExtendedEvents } from "@/interfaces";

interface Run<T extends keyof ExtendedEvents> {
  (client: Client, ...args: ExtendedEvents[T]): void;
}

export interface Event<T extends keyof ExtendedEvents> {
  name: T;
  run: Run<T>;
}
