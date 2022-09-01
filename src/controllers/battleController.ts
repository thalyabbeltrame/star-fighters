import { Request, Response } from "express";

import * as battleService from "../services/battleService"

const postBattle = async (req: Request, res: Response) => {
  const { firstUser, secondUser} = req.body;
  const battle = await battleService.postBattle(firstUser, secondUser);
  res.status(200).json(battle);
}

export { postBattle };