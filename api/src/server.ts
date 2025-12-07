import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import carRouter from "./routes/car.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;
// Routes
app.get("/", (req, res) => {
  res.send("API running!");
});

app.use("/car", carRouter);

app.listen(port, () => {
  console.log(`PORT ${port} is currently running.`);
});
