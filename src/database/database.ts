import { DataSource, EntitySchema, MixedList } from "typeorm";
import { DEV_MODE } from "../const/modes";
import IAppContainer from "../interfaces/app-factory/i-app-container";

export default class Database {
  readonly container: IAppContainer;
  readonly entities: MixedList<EntitySchema>;

  constructor(
    container: IAppContainer, 
    entities: MixedList<EntitySchema>
  ) {
    this.container = container;
    this.entities = entities;
  }

  public async initialize() {
    return new DataSource({
      type: this.container.config.db.type,
      host: "localhost",
      port: 5432,
      username: "root",
      password: "admin",
      database: "test",
      entities: this.entities,
      synchronize: this.container.config.dev,
      logging: this.container.config.dev,
    })
  }
}