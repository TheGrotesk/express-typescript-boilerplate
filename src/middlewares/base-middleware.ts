import { Request, Response, NextFunction } from "express";
import IAppContainer from "../interfaces/app-factory/i-app-container";
import IMiddleware from "../interfaces/middlewares/i-middleware";

export default class BaseMiddleware implements IMiddleware{
  readonly container: IAppContainer;

  public path = '';

  /**
   * BaseMiddleware
   * @param container 
   */
  constructor(container: IAppContainer) {
    this.container = container;
  }

  /**
   * Overrideble method
   * @param req 
   * @param res 
   * @param next 
   */
  middleware(req: Request, res: Response, next: NextFunction): void {
    //override
  }
}