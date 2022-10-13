import AppController from "../controllers/app-controller";
import IAppContainer from "../interfaces/app-factory/i-app-container";
import BaseRouter from "./base-router";

export default class AppRouter extends BaseRouter {
  constructor(container: IAppContainer) {
    super(container);
  }
  
  public override initializeRoutes(): void {
    const appController = new AppController(this.container);

    this.router.get('/', appController.list.bind(appController));
  }
}
