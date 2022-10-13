import IAppDbConfig from "./i-app-db-config";

export default interface IAppConfig {
  port: number;
  dev: boolean;
  db: IAppDbConfig;
}