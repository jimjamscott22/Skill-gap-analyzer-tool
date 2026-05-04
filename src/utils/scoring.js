function evaluateAssessment(answers, questions) {
  const totals = {};

  questions.forEach((question, index) => {
    if (!totals[question.category]) {
      totals[question.category] = { score: 0, total: 0 };
    }

    const weight = getQuestionWeight(question);
    const maxOptionScore = getMaxOptionScore(question);
    const questionTotal = maxOptionScore * weight;
    const answerIndex = answers[index];
    const answer = question.options[answerIndex];
    const answerScore = answer ? answer.score * weight : 0;
    totals[question.category].score += answerScore;
    totals[question.category].total += questionTotal;
  });

  const categoryResults = Object.entries(totals)
    .map(([category, values]) => ({ category, ...values }))
    .sort((left, right) => getRatio(right) - getRatio(left));

  const totalScore = categoryResults.reduce((sum, item) => sum + item.score, 0);
  const totalPossible = categoryResults.reduce((sum, item) => sum + item.total, 0);
  const strongestCategory = categoryResults[0].category;
  const sortedAscending = [...categoryResults].sort(
    (left, right) => getRatio(left) - getRatio(right),
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
  const ratio = total ? score / total : 0;
  if (ratio < 0.5) {
    return recommendations[category].beginner;
  }
  if (ratio < 1) {
    return recommendations[category].intermediate;
  }
  return recommendations[category].strong;
}

function findCorrectAnswerIndex(question) {
  const maxScore = getMaxOptionScore(question);
  return question.options.findIndex((option) => option.score === maxScore);
}

function findIncorrectAnswerIndex(question) {
  const minScore = getMinOptionScore(question);
  return question.options.findIndex((option) => option.score === minScore);
}

function getQuestionWeight(question) {
  return Number.isFinite(question.weight) ? question.weight : 1;
}

function getMaxOptionScore(question) {
  if (!question.options.length) {
    return 0;
  }
  return question.options.reduce((maxScore, option) => Math.max(maxScore, option.score), -Infinity);
}

function getMinOptionScore(question) {
  if (!question.options.length) {
    return 0;
  }
  return question.options.reduce((minScore, option) => Math.min(minScore, option.score), Infinity);
}

function getRatio(result) {
  return result.total ? result.score / result.total : 0;
}
