import { ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { Request, Response } from "express";
import IAppContainer from "../interfaces/app-factory/i-app-container";

export default class BaseController {
  readonly container: IAppContainer;

  constructor(container: IAppContainer) {
    this.container = container;
  }

  /**
   * Validates incoming data
   * @param data 
   * @param dto 
   * @returns 
   */
  public async validateData(data: Record<string, unknown>, dto: ClassConstructor<object>) {
    const dtoInstance = plainToInstance(dto, data);

    const validateResult = validateSync(dtoInstance);

    return validateResult;
  }

  /**
   * Get a list of entities
   * @param req
   * @param res
   * @returns 
   */
  public async list(req: Request, res: Response): Promise<Response> {
    //override
    return res.status(200);
  }

  /**
   * Get specific entity
   * @param req 
   * @param res 
   * @returns 
   */
  public async get(req: Request, res: Response): Promise<Response> {
    //override
    return res.status(200);
  }

  /**
   * Create new entity
   * @param req 
   * @param res 
   * @returns 
   */
  public async create(req: Request, res: Response): Promise<Response> {
    //override
    return res.status(200);
  }

  /**
   * Delete specific entity
   * @param req 
   * @param res 
   * @returns 
   */
  public async delete(req: Request, res: Response): Promise<Response> {
    //override
    return res.status(200);
  }

  /**
   * Update specific entity
   * @param req 
   * @param res 
   * @returns 
   */
  public async update(req: Request, res: Response): Promise<Response> {
    //override
    return res.status(200);
  }
}