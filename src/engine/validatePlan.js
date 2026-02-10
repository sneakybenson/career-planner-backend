export default function validatePlan(semesters, studentState = {}) {
  const errors = [];
  let totalCredits = 0;

  semesters.forEach((sem) => {
    sem.courses.forEach((course) => {
      totalCredits += course.credits || 0;
    });
  });

  if (
    studentState.minTotalCredits &&
    totalCredits < studentState.minTotalCredits
  ) {
    errors.push("Below minimum graduation credits");
  }

  return {
    valid: errors.length === 0,
    errors,
    totalCredits
  };
}