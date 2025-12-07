import express from "express";
import { CarController } from "../controller/car.controller";

const carRouter = express.Router();

carRouter.get("/all", CarController.getAll);

carRouter.post("/create", CarController.createCar);

export default carRouter;
