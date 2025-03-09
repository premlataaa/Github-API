import cluster from "cluster";
import os from "os";
import dotenv from "dotenv";
import app from "./server.js";
dotenv.config();

const port = process.env.PORT;
const isProduction = process.env.NODE_ENV === "production";
const numCPUs = os.cpus().length;

if (isProduction && cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(port, () =>
    console.log(`Server is listening on port ${port}! ☑️`.debug)
  );
}
