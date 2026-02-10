import express from "express";
import cors from "cors";
import simulationRoutes from "./routes/simulation.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api", simulationRoutes);

app.listen(PORT, () => {
  console.log(`Simulation engine running on port ${PORT}`);
});