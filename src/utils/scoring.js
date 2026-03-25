function evaluateAssessment(answers, questions) {
  const totals = {};

  questions.forEach((question, index) => {
    if (!totals[question.category]) {
      totals[question.category] = { score: 0, total: 0 };
    }

    const answerIndex = answers[index];
    const answer = question.options[answerIndex];
    totals[question.category].score += answer.score;
    totals[question.category].total += 1;
  });

  const categoryResults = Object.entries(totals)
    .map(([category, values]) => ({ category, ...values }))
    .sort((left, right) => (right.score / right.total) - (left.score / left.total));

  const totalScore = categoryResults.reduce((sum, item) => sum + item.score, 0);
  const totalPossible = categoryResults.reduce((sum, item) => sum + item.total, 0);
  const strongestCategory = categoryResults[0].category;
  const sortedAscending = [...categoryResults].sort(
    (left, right) => (left.score / left.total) - (right.score / right.total),
  );
  const weakestCategories = sortedAscending.slice(0, 2).map((item) => item.category);

  return {
    totalScore,
    totalPossible,
    strongestCategory,
    weakestCategories,
    categoryResults,
  };
}

function lookupRecommendation(category, score, total, recommendations) {
  const ratio = score / total;
  if (ratio < 0.5) {
    return recommendations[category].beginner;
  }
  if (ratio < 1) {
    return recommendations[category].intermediate;
  }
  return recommendations[category].strong;
}

function findCorrectAnswerIndex(question) {
  return question.options.findIndex((option) => option.score === 1);
}

function findIncorrectAnswerIndex(question) {
  return question.options.findIndex((option) => option.score === 0);
}
