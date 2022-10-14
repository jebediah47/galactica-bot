declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GALACTICA_TOKEN: string;
    }
  }
}

export {};
