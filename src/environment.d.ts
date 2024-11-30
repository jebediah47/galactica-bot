declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GALACTICA_TOKEN: string
      GALACTICA_API_PORT?: string | number
      JWT_SECRET: string
    }
  }
}

export {}
