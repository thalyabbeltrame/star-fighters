import express, { json, Express } from "express";
import cors from "cors";
import "express-async-errors";

import router from "./routers/index";
import { ErrorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";

const app: Express = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(ErrorHandlerMiddleware);

export default app;