function describeGap(categoryResult) {
  const ratio = categoryResult.score / categoryResult.total;
  if (ratio === 1) {
    return "This is currently a strength. Keep practicing so it stays sharp while you build deeper projects.";
  }
  if (ratio >= 0.5) {
    return "You have working familiarity here, but more repetition and project-based practice would improve consistency.";
  }
  return "This category needs focused foundational review before it becomes reliable in real project work.";
}

function formatCategoryList(categoryKeys, categories) {
  if (categoryKeys.length === 1) {
    return categories[categoryKeys[0]];
  }

  return categoryKeys
    .map((category) => categories[category])
    .join(" and ");
}
