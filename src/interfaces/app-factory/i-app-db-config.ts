import { DatabaseType } from "typeorm";

export default interface IAppDbConfig {
  type: DatabaseType;
  host: string;
  password: string;
  database: string;
  port: number;
}