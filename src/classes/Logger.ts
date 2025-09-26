import pino from "pino";

export class Logger {
  private logger: pino.Logger;

  public constructor() {
    const isDevelopment = Bun.env.NODE_ENV === "development";

    this.logger = pino({
      level: isDevelopment ? "debug" : "info",
      transport: isDevelopment
        ? {
            target: "pino-pretty",
            options: {
              colorize: true,
            },
          }
        : undefined,
    });
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public trace(message: string): void {
    this.logger.trace(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public fatal(message: string): void {
    this.logger.fatal(message);
  }
}
