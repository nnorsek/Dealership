import express from "express";
import cors from "cors";
import carRouter from "./routes/car.routes";
import s3Router from "./util/ImageUploader";

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;
// Routes
app.get("/", (req, res) => {
  res.send("API running!");
});

app.use("/car", carRouter);
app.use("/image", s3Router);

app.listen(port, () => {
  console.log(`PORT ${port} is currently running.`);
});
