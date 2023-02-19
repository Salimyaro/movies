import { config } from "dotenv";
import cors from "cors";
import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import usersRouter from "./routes/users.route.js";
import sessionsRouter from "./routes/sessions.route.js";
import moviesRouter from "./routes/movies.route.js";
import { sequelize } from "./db/index.js";
import { errorMiddleware } from "./middleware/errors.js";
import { swaggerSpec } from "./swagger/swagger.js";

config();

const app: Application = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/sessions", sessionsRouter);
app.use("/api/v1/movies", moviesRouter);

app.use("/api/v1/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", (_, res) => res.redirect("/api/v1/swagger"));

app.use(errorMiddleware);

const PORT: number = process.env.APP_PORT ? Number(process.env.APP_PORT) : 5000;
const HOST = "0.0.0.0";

const start = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    app.listen(PORT, HOST, () => {
      console.log(`Running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.log("Server Error", error);
    sequelize.close();
    process.exit(1);
  }
};

process.on("SIGINT", () => {
  console.log("received sigint");
  setTimeout(() => {
    console.log("exit");
    sequelize.close();
    process.exit(0);
  }, 500);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("uncaughtException:", error);
});

start();
