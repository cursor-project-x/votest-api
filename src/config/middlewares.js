import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";

export default app => {
  if (isProd) {
    app.use(compression());
    app.use(helmet());
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (isDev) {
    app.use(morgan("dev"));
  }
};

if (process.env.NODE_ENV === "development") {
  console.log("Welcome to development");
}

if (process.env.NODE_ENV === "production") {
  console.log("Welcome to production");
}
