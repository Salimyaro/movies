import path from "node:path";
import { config } from "dotenv";
import joiToSwagger from "joi-to-swagger";
import swaggerJSDoc, { Options } from "swagger-jsdoc";
import { getDirName } from "../helpers/index.js";
import { loginSchema } from "../validation/session.validationSchema.js";
import { registerSchema } from "../validation/users.validationSchema.js";
import { createMovie, movieId } from "../validation/movie.validationSchema.js";

config();

const s2j: any = joiToSwagger;

const __dirname = getDirName(import.meta.url);

const options: Options = {
  apis: [path.join(__dirname, "../", "docs", "**/*.yaml")],
  definition: {
    info: {
      title: "REST API for Movies",
      version: "1.0.1",
      description: "This is the REST API for Movies"
    },
    openapi: "3.0.0",
    host: "localhost:8000",
    basePath: "/api/v1",
    servers: [
      {
        url: `http://0.0.0.0:${
          process.env.DOCKER_PORT || process.env.APP_PORT || 5000
        }/api/v1`
      }
    ],
    components: {
      schemas: {
        Register: s2j(registerSchema).swagger,
        Login: s2j(loginSchema).swagger,
        MovieId: s2j(movieId).swagger,
        CreateMovie: s2j(createMovie).swagger
      }
    }
  }
};

export const swaggerSpec = swaggerJSDoc(options);
