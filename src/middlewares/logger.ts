import { Request, Response, NextFunction } from 'express';
import IAppContainer from '../interfaces/app-factory/i-app-container';
import BaseMiddleware from "./base-middleware";

export class LoggerMiddleware extends BaseMiddleware{
  constructor(container: IAppContainer) {
    super(container);
    this.path = '/hello';
  }

  override middleware(req: Request, res: Response, next: NextFunction): void {
    this.container.logger.info(Date.now().toString());
    this.container.logger.info(`Request [${req.headers.location}]:`);

    this.container.logger.info('Hello');
    
    if (req.body) {
      this.container.logger.info('Request body:', req.body);
    }
  
    if (req.params) {
      this.container.logger.info('Request params:', req.params);
    }
  
    next();
  }
}