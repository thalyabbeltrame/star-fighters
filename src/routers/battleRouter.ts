import { Router } from "express";

import { postBattle } from "../controllers/battleController";
import { validateBody } from "../middlewares/bodyMiddleware";
import { battleSchema } from "../schemas/battleSchema";

const battleRouter: Router = Router();

battleRouter.post("/battle", validateBody(battleSchema), postBattle);

export default battleRouter;