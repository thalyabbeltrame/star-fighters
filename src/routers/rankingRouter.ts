import { Router } from "express";

import { getRanking } from "../controllers/rankingController";

const rankingRouter: Router = Router();

rankingRouter.get("/ranking", getRanking);

export default rankingRouter;