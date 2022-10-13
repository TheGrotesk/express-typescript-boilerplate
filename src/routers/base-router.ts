import { Router } from "express";
import IAppContainer from "../interfaces/app-factory/i-app-container";
import IRouter from "../interfaces/routers/i-router";
import BaseMiddleware from "../middlewares/base-middleware";

/**
 * BaseRouter
 * Intialize express router
 * Initialize middlewares for this router
 */
export default class BaseRouter implements IRouter {
  readonly router: Router;
  readonly container: IAppContainer;
  
  /**
   * @param middlewares Middlewares array
   */
  constructor(container: IAppContainer) {
    this.router = Router();
    this.container = container;
  }

  /**
   * Initialize all router middleware
   * If path is empty, middleware will work for the whole router
   */
  protected initializeMiddlewares(middlewares: typeof BaseMiddleware[]) {
    for(const middleware of middlewares) {
      const middlewareInstance = new middleware(this.container);

      if (middlewareInstance.path) {
        this.router.use(middlewareInstance.path, middlewareInstance.middleware.bind(middlewareInstance));
      } else {
        this.router.use(middlewareInstance.middleware.bind(middlewareInstance));
      }
    }
  }

  /**
   * Need to be overrided in child class
   */
  public initializeRoutes(): void {
    //override
    this.initializeMiddlewares([]);

    this.router.get('/', () => {/*empty*/});
  }

  /**
   * Run all initializations and return Router
   * @returns Router
   */
  public initialize(): Router {
    this.initializeRoutes();

    return this.router;
  }
}