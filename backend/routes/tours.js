import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  getTours,
  updateTour,
} from "./../controllers/tourController.js";

import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// create new tour
router.post("/addtour", verifyAdmin,createTour);

// update tour
router.put("/:id", verifyAdmin, updateTour);

// delete tour
router.delete("/:id", verifyAdmin, deleteTour);

//get tours for admin
router.get("/tours", getTours);

// get single tour
router.get("/:id", getSingleTour);

// get All tours
router.get("/", getAllTour);

// get tour by search
router.get("/search/getTourBySearch", getTourBySearch);

router.get("/search/getFeaturedTours", getFeaturedTour);

router.get("/search/getTourCount", getTourCount);

export default router;
