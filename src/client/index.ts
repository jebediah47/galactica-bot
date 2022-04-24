import { Client, Collection, Intents } from "discord.js";
import { Command, Event, Config } from "../interfaces";
import * as ConfigJson from "../../config.json";
import { YtDlpPlugin } from "@distube/yt-dlp";
import { DisTube } from "distube";
import { readdirSync } from "fs";
import { stdout } from "process";
import * as path from "path";

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public aliases: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public distube: DisTube | undefined;
  public config: Config = ConfigJson;
  public constructor(intents = new Intents(32767)) {
    super({ intents });
  }

  public async init(): Promise<void> {
    this.login(this.config.TOKEN);
    const command_files = path.join(__dirname, "..", "commands");
    readdirSync(command_files).forEach(async (dir) => {
      const commands = readdirSync(`${command_files}/${dir}`).filter(
        (file) => file.endsWith(".ts") || file.endsWith(".js") // the second filter is for when the bot is built in JS
      );
      if (command_files.length <= 0) {
        return stdout.write("[LOGS] Couldn't Find Commands!");
      }

      for (const file of commands) {
        const { command } = await import(`${command_files}/${dir}/${file}`);
        this.commands.set(command.name, command);

        if (command?.aliases.length !== 0) {
          command.aliases.forEach((alias: string) => {
            this.aliases.set(alias, command);
          });
        }
      }
    });
    const event_files = path.join(__dirname, "..", "events");
    readdirSync(event_files).forEach(async (file) => {
      const { event } = await import(`${event_files}/${file}`);
      this.events.set(event.name, event);
      this.on(event.name, event.run.bind(null, this)) &&
        this.distube
          ?.on(event.name, event.run.bind(null, this))
          .setMaxListeners(2);
    });
    if (this.config.MUSIC_IS_ENABLED === true) {
      this.distube = new DisTube(this, {
        searchSongs: 0,
        emitNewSongOnly: true,
        emitAddSongWhenCreatingQueue: false,
        emitAddListWhenCreatingQueue: false,
        plugins: [new YtDlpPlugin()],
        youtubeDL: false,
      });
    } else {
      process.stdout.write(
        "Music has been disabled for this session due to MUSIC_IS_ENABLED value being false in the config.json \n"
      );
    }
  }
}

export default ExtendedClient;
