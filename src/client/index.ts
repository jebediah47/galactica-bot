import { Command, Event, Config, RegisterCommandOptions } from "../interfaces";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { SpotifyPlugin } from "@distube/spotify";
import * as ConfigJson from "../../config.json";
import { YtDlpPlugin } from "@distube/yt-dlp";
import { galacticaServer } from "../server";
import { readdir } from "node:fs/promises";
import { DisTube } from "distube";
import * as path from "node:path";
import { stdout } from "process";
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
  public async registerCommands({ commands }: RegisterCommandOptions) {
    this.application?.commands.set(commands);
  }
  public async init(): Promise<void> {
    this.login(this.config.TOKEN);
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const command_files = path.join(__dirname, "..", "commands");
    (await readdir(command_files)).forEach(async (dir) => {
      const commands = (await readdir(`${command_files}/${dir}`)).filter(
        (file) => file.endsWith(".ts") || file.endsWith(".js") // the second filter is for when the bot is built in JS
      );
      if (command_files.length <= 0) {
        return stdout.write("[LOGS] Couldn't Find Commands!");
      }

      for (const file of commands) {
        const { command } = await import(`${command_files}/${dir}/${file}`);
        this.commands.set(command.name, command);
        slashCommands.push(command);
      }
    });
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
      this.distube
        ?.on(event.name, event.run.bind(null, this))
        .setMaxListeners(2);
    });
    if (this.config.SERVER_OPTIONS.ENABLED === true) {
      galacticaServer(this.config.SERVER_OPTIONS.PORT);
    }
    if (this.config.MUSIC_IS_ENABLED === true) {
      this.distube = new DisTube(this, {
        searchSongs: 0,
        emitNewSongOnly: true,
        emitAddSongWhenCreatingQueue: false,
        emitAddListWhenCreatingQueue: false,
        plugins: [
          new YtDlpPlugin(),
          new SpotifyPlugin(),
          new SoundCloudPlugin(),
        ],
        youtubeDL: false,
      });
      this.distube.on("error", () => {
        return;
      });
    } else {
      process.stdout.write(
        "Music has been disabled for this session due to MUSIC_IS_ENABLED value being false in the config.json \n"
      );
    }
  }
}

export default ExtendedClient;
