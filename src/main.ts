import winston, { Logger } from 'winston';

import AppFactory from "./app-factory";
import { DEV_MODE, PRODUCTION_MODE } from './const/modes';

import { LoggerMiddleware } from "./middlewares/logger";

import AppRouter from "./routers/app-router";

(async () => {
  const mode = process.env.NODE_ENV;

  if (mode !== DEV_MODE && mode !== PRODUCTION_MODE) {
    throw new Error(`Unknown app mode ${mode}. Please, use ${DEV_MODE} or ${PRODUCTION_MODE}!`);
  }

  const configPath = `./configs/config.${mode}.json`;
  const config = await require(configPath);

  const logger: Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error'
      }),
      new winston.transports.File({
        filename: 'logs/app-combined.log'
      })
    ]
  });

  //Add console logs to Winston if its dev mode
  if (mode === DEV_MODE) {
    logger.add(new winston.transports.Console());
  }

  //Build the app
  const appFactory: AppFactory = new AppFactory(config, [
    LoggerMiddleware
  ], [
    AppRouter
  ], {
    logger,
    config,
    mode
  });

  //Start the app and listen on port
  appFactory.run();
})();
