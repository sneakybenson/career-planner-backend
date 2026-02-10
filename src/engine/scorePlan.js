export function scorePlan(plan, weights = {}) {
  let totalCredits = 0;
  let totalQualityPoints = 0;
  let relevance = 0;

  for (const sem of plan.semesters) {
    for (const course of sem.courses) {
      const difficulty = course.difficulty ?? 0.5;
      const grade = Math.max(2.0, 4 - difficulty);
      totalCredits += course.credits;
      totalQualityPoints += grade * course.credits;
      relevance += course.careerValue ?? 0;
    }
  }

  const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;

  const totalScore =
    (gpa / 4) * (weights.gpa || 0.4) +
    (relevance / 100) * (weights.relevance || 0.6);

  return {
    ...plan,
    gpa: Number(gpa.toFixed(2)),
    totalScore: Number(totalScore.toFixed(4))
  };
}