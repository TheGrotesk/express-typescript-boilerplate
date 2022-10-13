import express from 'express';
import IAppContainer from '../app-factory/i-app-container';

export default interface IMiddleware {
  path?: string;
  readonly container: IAppContainer;
  middleware(req: express.Request, res: express.Response, next: express.NextFunction): void;
}