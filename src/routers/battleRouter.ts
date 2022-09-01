import { Router } from "express";

import { postBattle } from "../controllers/battleController";
import { validateBody } from "../middlewares/bodyMiddleware";
import { fightersSchema } from "../schemas/fightersSchema";

const battleRouter: Router = Router();

battleRouter.post("/battle", validateBody(fightersSchema), postBattle);

export default battleRouter;