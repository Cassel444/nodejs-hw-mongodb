import express from "express";
import cors from "cors";
import pino from "pino-http";

import { ENV_VARS } from "./constants/index.js";
import { env } from "./utils/env.js";
import contactRouter from "./routers/contacts.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

const PORT = Number(env(ENV_VARS.PORT, "3000"));

export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(pino({
        transport: {
            target: "pino-pretty",
        },
    }),
    );
    app.use("/contacts", contactRouter);

    app.use("*", notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
