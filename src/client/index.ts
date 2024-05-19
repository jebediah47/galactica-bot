import { readdir } from "node:fs/promises";
import path from "node:path";
import {
  ApplicationCommandDataResolvable,
  Collection,
  Client,
  GatewayIntentBits,
  ClientEvents,
} from "discord.js";
import { PrismaClient, GuildConfigs } from "@prisma/client";
import { config } from "../../config";
import { Leveling } from "@/classes/Leveling";
import { Command, Event, RegisterCommandOptions, Config } from "@/interfaces";

class ExtendedClient extends Client {
  public configs: Collection<string, GuildConfigs> = new Collection();
  public commands: Collection<string, Command> = new Collection();
  public slashCommands: ApplicationCommandDataResolvable[] = [];
  public events: Collection<string, Event<keyof ClientEvents>> =
    new Collection();
  public prisma: PrismaClient = new PrismaClient();
  public levels: Leveling = new Leveling(this.prisma);
  public config: Config = config;
  public constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildScheduledEvents,
      ],
    });
  }

  public async registerCommands({ commands }: RegisterCommandOptions) {
    await this.application?.commands.set(commands);
  }

  public async init(): Promise<void> {
    this.login(process.env.GALACTICA_TOKEN).then();
    const command_files = path.join(__dirname, "..", "commands");
    for (const dir of await readdir(command_files)) {
      const commands = (await readdir(`${command_files}/${dir}`)).filter(
        (file: string) => file.endsWith(".ts") || file.endsWith(".js"),
      );

      for (const file of commands) {
        const { command } = await import(`${command_files}/${dir}/${file}`);
        this.commands.set(command.name, command);
        this.slashCommands.push(command);
      }
    }
    const event_files = path.join(__dirname, "..", "events");
    for (const dir of await readdir(event_files)) {
      const events = (await readdir(`${event_files}/${dir}`)).filter(
        (file) => file.endsWith(".ts") || file.endsWith(".js"),
      );

      for (const file of events) {
        const { event } = await import(`${event_files}/${dir}/${file}`);
        this.events.set(event.name, event);
        this.on(event.name, event.run.bind(null, this));
      }
    }
  }
}

export default ExtendedClient;
