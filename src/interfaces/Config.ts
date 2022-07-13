export interface Config {
  TOKEN: string;
  BOT_PRESENCE: string;
  BOT_PRESENCE_TYPE: string;
  MODLOGS_CHANNEL_NAME: string;
  SERVER_OPTIONS: {
    ENABLED: boolean;
    PORT: number | null;
  };
}
