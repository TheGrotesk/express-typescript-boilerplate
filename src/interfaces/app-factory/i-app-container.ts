import { Logger } from "winston";
import IAppConfig from "./i-app-config";

export default interface IAppContainer {
  logger: Logger;
  config: IAppConfig;
}