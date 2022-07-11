import { Command, Event, Config, RegisterCommandOptions } from "../interfaces";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { SpotifyPlugin } from "@distube/spotify";
import * as ConfigJson from "../../config.json";
import { YtDlpPlugin } from "@distube/yt-dlp";
import { galacticaServer } from "../server";
import { readdir } from "node:fs/promises";
import { DisTube } from "distube";
import { stdout } from "process";
import path from "node:path";
import {
  ApplicationCommandDataResolvable,
  Collection,
  Client,
} from "discord.js";

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
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
        (file) => file.endsWith(".ts") || file.endsWith(".js") // the second filter is for when the bot is built in JS
      );
      if (command_files.length <= 0) {
        stdout.write("[LOGS] Couldn't Find Commands!");
      }

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
    (await readdir(event_files)).forEach(async (file) => {
      const { event } = await import(`${event_files}/${file}`);
      this.events.set(event.name, event);
      this.on(event.name, event.run.bind(null, this));
      if (this.config.MUSIC_IS_ENABLED) {
        this.distube?.on(event.name, event.run.bind(null, this));
      }
    });
    if (this.config.SERVER_OPTIONS.ENABLED) {
      galacticaServer(this.config.SERVER_OPTIONS.PORT);
    }
    if (this.config.MUSIC_IS_ENABLED) {
      this.distube = new DisTube(this, {
        searchSongs: 0,
        emitAddSongWhenCreatingQueue: false,
        emitAddListWhenCreatingQueue: false,
        plugins: [
          new YtDlpPlugin(),
          new SpotifyPlugin(),
          new SoundCloudPlugin(),
        ],
        youtubeDL: false,
      });
    } else {
      process.stdout.write(
        `MUSIC_IS_ENABLED: ${this.config.MUSIC_IS_ENABLED}\n`
      );
    }
  }
}

export default ExtendedClient;
