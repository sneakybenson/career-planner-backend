export function generateExplanation(plan, weights) {
  const reasons = [];

  if (weights.gpa > 0.5) {
    reasons.push("Plan optimized to protect GPA.");
  }

  if (weights.relevance > 0.5) {
    reasons.push("Prioritized high career-value courses.");
  }

  const avgCredits =
    plan.semesters.reduce((a, s) => a + s.totalCredits, 0) /
    plan.semesters.length;

  if (avgCredits < 15) {
    reasons.push("Maintains lighter semester workload.");
  }

  if (plan.gpa >= 3.7) {
    reasons.push("High projected GPA trajectory.");
  }

  return {
    summary: reasons.join(" "),
    details: {
      projectedGPA: plan.gpa,
      totalScore: plan.totalScore,
      averageCredits: Number(avgCredits.toFixed(1))
    }
  };
}