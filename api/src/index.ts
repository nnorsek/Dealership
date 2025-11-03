import dotenv from "dotenv";
import app from "./server";

dotenv.config();

const { DB_PORT } = process.env;

app.listen(DB_PORT, () => {
  console.log(`PORT ${DB_PORT} is currently running.`);
});
