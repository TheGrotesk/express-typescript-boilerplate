import { Router } from "express";
import IAppContainer from "../app-factory/i-app-container";

export default interface IRouter {
  readonly router: Router;
  readonly container: IAppContainer;

  initializeRoutes(): void;
  initialize(): Router;
}