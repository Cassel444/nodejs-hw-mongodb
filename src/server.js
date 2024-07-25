import express from "express";
import cors from "cors";
import pino from "pino-http";

import { ENV_VARS } from "./constants/index.js";
import { env } from "./utils/env.js";

const PORT = Number(env(ENV_VARS.PORT, "3000"));

export const setupServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(pino({
        transport: {
            target: "pino-pretty",
        },
    }),
    );

    app.use("*", (req, res, next) => {
        res.status(404).json({
            message: "Not found",
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
