declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GALACTICA_TOKEN: string
      GALACTICA_API_BEARER: string
      GALACTICA_API_PORT?: string | number
    }
  }
}

export {}
