import { canTakeCourse } from "./constraints.js";

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export function generateRandomPlan({ courses, constraints }) {
  const semesters = [];

  for (let i = 0; i < 8; i++) {
    semesters.push({
      index: i,
      termType: i % 2 === 0 ? "Fall" : "Spring",
      courses: [],
      totalCredits: 0
    });
  }

  const shuffled = shuffle([...courses]);
  const completedBySemester = Array.from({ length: 8 }, () => new Set());

  for (const course of shuffled) {
    for (let i = 0; i < semesters.length; i++) {
      const semester = semesters[i];

      const completedBefore = new Set();
      for (let j = 0; j < i; j++) {
        completedBySemester[j].forEach(c => completedBefore.add(c));
      }

      if (canTakeCourse(course, semester, completedBefore, constraints)) {
        semester.courses.push(course);
        semester.totalCredits += course.credits;
        completedBySemester[i].add(course.id);
        break;
      }
    }
  }

  const placed = new Set();
  completedBySemester.forEach(set => set.forEach(c => placed.add(c)));

  const allPlaced = placed.size === courses.length;

  return {
    semesters,
    valid: allPlaced
  };
}