import express from "express";
import { addTour } from "../controllers/adminController";

const router = express.Router();

router.get("/", addTour);

export default router;
