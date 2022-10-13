import { Request, Response } from "express";

export default interface IControllerMethod {
  (req: Request, res: Response): Response;
}