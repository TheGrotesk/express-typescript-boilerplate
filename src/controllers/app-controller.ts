import { Request, Response } from "express";
import AppDto from "../dto/app-dto";
import IAppContainer from "../interfaces/app-factory/i-app-container";
import BaseController from "./base-controller";

export default class AppController extends BaseController {
  constructor(container: IAppContainer) {
    super(container);
  }

  public override async list(req: Request, res: Response): Promise<Response> {
    // const data = req.body;

    // const validatedData = await this.validateData(data, AppDto);

    
    return res.status(200).send({ message: "Hello world!" });
  }
}