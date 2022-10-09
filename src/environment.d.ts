declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      BOT_PRESENCE: string;
      BOT_PRESENCE_TYPE: string;
      SERVER_ENABLED: boolean;
      SERVER_PORT: number;
    }
  }
}

export {};
