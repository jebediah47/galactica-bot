import { Command, Event, Config, RegisterCommandOptions } from "../interfaces";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { SpotifyPlugin } from "@distube/spotify";
import * as ConfigJson from "../../config.json";
import { PrismaClient } from "@prisma/client";
import { YtDlpPlugin } from "@distube/yt-dlp";
import { galacticaServer } from "../server";
import { readdir } from "node:fs/promises";
import { DisTube } from "distube";
import path from "node:path";
import {
  ApplicationCommandDataResolvable,
  Collection,
  Client,
} from "discord.js";

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public prisma: PrismaClient = new PrismaClient();
  public distube: DisTube | undefined;
  public config: Config = ConfigJson;
  public constructor() {
    super({
      intents: 32767,
    });
  }
  private async registerCommands({ commands }: RegisterCommandOptions) {
    await this.application?.commands.set(commands);
  }
  public async init(): Promise<void> {
    this.login(this.config.TOKEN).then();
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const command_files = path.join(__dirname, "..", "commands");
    for (const dir of await readdir(command_files)) {
      const commands = (await readdir(`${command_files}/${dir}`)).filter(
        (file) => file.endsWith(".ts") || file.endsWith(".js")
      );

      for (const file of commands) {
        const { command } = await import(`${command_files}/${dir}/${file}`);
        this.commands.set(command.name, command);
        slashCommands.push(command);
      }
    }
    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
      });
    });
    const event_files = path.join(__dirname, "..", "events");
    for (const dir of await readdir(event_files)) {
      const events = (await readdir(`${event_files}/${dir}`)).filter(
        (file) => file.endsWith(".ts") || file.endsWith(".js")
      );

      for (const file of events) {
        const { event } = await import(`${event_files}/${dir}/${file}`);
        this.events.set(event.name, event);
        this.on(event.name, event.run.bind(null, this));
        this.distube?.on(event.name, event.run.bind(null, this));
      }
    }
    if (this.config.SERVER_OPTIONS.ENABLED) {
      galacticaServer(this.config.SERVER_OPTIONS.PORT);
    }
    this.distube = new DisTube(this, {
      searchSongs: 0,
      emitAddSongWhenCreatingQueue: false,
      emitAddListWhenCreatingQueue: false,
      plugins: [
        new YtDlpPlugin({ update: true }),
        new SpotifyPlugin(),
        new SoundCloudPlugin(),
      ],
      youtubeDL: false,
    });
  }
}

export default ExtendedClient;
