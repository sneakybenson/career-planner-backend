export function canTakeCourse(course, semester, completed, constraints) {
  if (course.prerequisites) {
    for (const prereq of course.prerequisites) {
      if (!completed.has(prereq)) return false;
    }
  }

  if (
    course.termsOffered &&
    !course.termsOffered.includes(semester.termType)
  ) {
    return false;
  }

  if (
    semester.totalCredits + course.credits >
    (constraints?.maxCreditsPerSemester || 18)
  ) {
    return false;
  }

  return true;
}