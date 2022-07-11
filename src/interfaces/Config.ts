export interface Config {
  TOKEN: string;
  BOT_PRESENCE: string;
  MUSIC_IS_ENABLED: boolean;
  BOT_PRESENCE_TYPE: string;
  MODLOGS_CHANNEL_NAME: string;
  SERVER_OPTIONS: {
    ENABLED: boolean;
    PORT: number | null;
  };
}
