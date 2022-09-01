import { Request, Response } from "express";

import * as rankingService from "../services/rankingService"

const getRanking = async (_req: Request, res: Response) => {
  const fighters = await rankingService.getRanking();
  return res.status(200).json(fighters);
}

export { getRanking };