import { Command, Event, Config } from "../interfaces";
import { Client, Collection } from "discord.js";
import * as ConfigJson from "../../config.json";
import { readdirSync } from "fs";
import * as path from "path";

class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public aliases: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public config: Config = ConfigJson;

  public async init() {
    this.login(this.config.TOKEN);
    const command_files = path.join(__dirname, "..", "commands");
    readdirSync(command_files).forEach((dir) => {
      const commands = readdirSync(`${command_files}/${dir}`).filter(
        (file) => file.endsWith(".ts") || file.endsWith(".js") // the second filter is for when the bot is built in JS
      );
      if (command_files.length <= 0) {
        return console.log("[LOGS] Couldn't Find Commands!");
      }

      for (const file of commands) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { command } = require(`${command_files}/${dir}/${file}`);
        this.commands.set(command.name, command);

        if (command?.aliases.length !== 0) {
          command.aliases.forEach((alias) => {
            this.aliases.set(alias, command);
          });
        }
      }
    });
    const event_files = path.join(__dirname, "..", "events");
    readdirSync(event_files).forEach(async (file) => {
      const { event } = await import(`${event_files}/${file}`);
      this.events.set(event.name, event);
      console.log(event);
      this.on(event.name, event.run.bind(null, this));
    });
  }
}

export default ExtendedClient;
