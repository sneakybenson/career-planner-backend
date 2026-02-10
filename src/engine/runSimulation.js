import { generateExplanation } from "./explanationEngine.js";
import { v4 as uuidv4 } from "uuid";
import { generateRandomPlan } from "./generateRandomPlan.js";
import { scorePlan } from "./scorePlan.js";
import validatePlan from "./validatePlan.js";

export function runSimulation({
  courses,
  constraints = {},
  weights = {},
  studentState = {},
  iterations = 1000
}) {
  const validPlans = [];

  for (let i = 0; i < iterations; i++) {
    const plan = generateRandomPlan({ courses, constraints });

    const validation = validatePlan(plan.semesters, studentState);

    if (!validation.valid) continue;

    const scored = scorePlan(plan, weights);

const explanation = generateExplanation(scored, weights);

validPlans.push({
  id: uuidv4(),
  ...scored,
  explanation
});
  }

  validPlans.sort((a, b) => b.totalScore - a.totalScore);

  return {
    meta: {
      iterations,
      validPlans: validPlans.length
    },
    topPlans: validPlans.slice(0, 5)
  };
}