import express from "express";
import routes from "./routes/routes.js";
import * as setup from "./db/setup.js";
import * as dotenv from "dotenv";

dotenv.config();
setup.run();

const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
