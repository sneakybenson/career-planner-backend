import express from "express";
import { runSimulation } from "../engine/runSimulation.js";

const router = express.Router();

router.post("/run-simulation", (req, res) => {
  try {
    const { courses, constraints, weights, studentState } = req.body;

    if (!courses) {
      return res.status(400).json({ error: "Courses missing" });
    }

    const result = runSimulation({
      courses,
      constraints,
      weights,
      studentState,
      iterations: 2000,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Simulation failed" });
  }
});

export default router;