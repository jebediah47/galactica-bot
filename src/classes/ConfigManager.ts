import Conf, { type Schema } from "conf";

export class ConfigManager {
  private _config: Conf;

  private schema: Schema<Record<string, unknown>> = {
    botPresence: {
      type: "string",
      default: "for commands!",
    },
    botPresenceType: {
      type: "number",
      maximum: 5,
      minimum: 0,
      default: 3,
    },
  };

  public constructor() {
    this._config = new Conf({
      projectName: "galactica-bot",
      schema: this.schema,
    });
  }

  public get(key: string) {
    return this._config.get(key);
  }

  public set(key: string, value: string | number): void {
    this._config.set(key, value);
  }

  public delete(key: string): void {
    this._config.delete(key);
  }
}
