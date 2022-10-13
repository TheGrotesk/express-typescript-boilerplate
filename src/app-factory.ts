import IAppConfig from "./interfaces/app-factory/i-app-config";

import express from 'express';
import BaseRouter from "./routers/base-router";
import IAppContainer from "./interfaces/app-factory/i-app-container";
import BaseMiddleware from "./middlewares/base-middleware";

export default class AppFactory {
  public readonly appConfig: IAppConfig;
  private readonly app: express.Application;
  private readonly middlewares: typeof BaseMiddleware[];
  private readonly routers: typeof BaseRouter[];
  private readonly container: IAppContainer;

  /**
   * AppFactory
   * @param appConfig 
   * @param middlewares 
   * @param routers 
   */
  constructor(
    appConfig: IAppConfig, 
    middlewares: typeof BaseMiddleware[], 
    routers: typeof BaseRouter[],
    container: IAppContainer
  ) {
    this.appConfig = appConfig;
    this.app = express();
    this.middlewares = middlewares;
    this.routers = routers;
    this.container = container;
  }

  /**
   * Initialize middlewares
   * If path is undefined, initialize middleware for every route in app
   */
  private initMiddlewares() {
    for(const middleware of this.middlewares) {
      const middlewareInstance = new middleware(this.container);

      if (middlewareInstance.path) {
        this.app.use(middlewareInstance.path, middlewareInstance.middleware.bind(middlewareInstance));
      } else {
        this.app.use(middlewareInstance.middleware.bind(middlewareInstance));
      }
    }
  }

  /**
   * Initialize routers
   */
  private initRouters() {
    for(const router of this.routers) {
      const routerInstance = new router(this.container);

      const expressRouter = routerInstance.initialize();
      
      this.app.use(expressRouter);
    }
  }

  /**
   * Run all initialization methods
   * Start a server on a defined port
   */
  public async run(): Promise<void> {
    this.initMiddlewares();
    this.initRouters();

    this.app.listen(this.appConfig.port, () => {
      console.log('App listening on port', this.appConfig.port);
    });
  }
}