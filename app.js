const categories = {
  html_css: "HTML/CSS Fundamentals",
  javascript: "JavaScript Basics",
  react: "React / JSX Concepts",
  typescript: "TypeScript Basics",
  debugging: "Debugging & Problem Solving",
};

const questions = [
  {
    id: "html-1",
    category: "html_css",
    prompt: "Which HTML element is the best semantic choice for a site's main navigation links?",
    options: [
      { label: "<div>", score: 0 },
      { label: "<section>", score: 0 },
      { label: "<nav>", score: 1 },
      { label: "<span>", score: 0 },
    ],
  },
  {
    id: "html-2",
    category: "html_css",
    prompt: "Which CSS layout tool is usually best when you need items aligned in one direction with spacing and wrapping?",
    options: [
      { label: "Flexbox", score: 1 },
      { label: "Float", score: 0 },
      { label: "Position absolute", score: 0 },
      { label: "z-index", score: 0 },
    ],
  },
  {
    id: "js-1",
    category: "javascript",
    prompt: "What does Array.map() return?",
    options: [
      { label: "The original array after mutation", score: 0 },
      { label: "A new array of transformed values", score: 1 },
      { label: "Only the first transformed value", score: 0 },
      { label: "A boolean indicating success", score: 0 },
    ],
  },
  {
    id: "js-2",
    category: "javascript",
    prompt: "Which statement about const in JavaScript is correct?",
    options: [
      { label: "It makes objects deeply immutable", score: 0 },
      { label: "It prevents reassignment of the binding", score: 1 },
      { label: "It can only store strings", score: 0 },
      { label: "It behaves the same as var", score: 0 },
    ],
  },
  {
    id: "react-1",
    category: "react",
    prompt: "In React, what is the main purpose of component state?",
    options: [
      { label: "To store data that can change and trigger UI updates", score: 1 },
      { label: "To define CSS classes globally", score: 0 },
      { label: "To replace HTML entirely", score: 0 },
      { label: "To avoid passing props to children", score: 0 },
    ],
  },
  {
    id: "react-2",
    category: "react",
    prompt: "Why do lists in React need stable key values?",
    options: [
      { label: "To make JavaScript run faster in every case", score: 0 },
      { label: "To help React track item identity between renders", score: 1 },
      { label: "To allow inline styles to work", score: 0 },
      { label: "To stop components from receiving props", score: 0 },
    ],
  },
  {
    id: "ts-1",
    category: "typescript",
    prompt: "What is a primary benefit of TypeScript in a frontend project?",
    options: [
      { label: "It replaces the browser runtime", score: 0 },
      { label: "It catches certain type-related errors before runtime", score: 1 },
      { label: "It removes the need for testing", score: 0 },
      { label: "It automatically optimizes CSS", score: 0 },
    ],
  },
  {
    id: "ts-2",
    category: "typescript",
    prompt: "Which TypeScript type best describes a variable that can be a string or a number?",
    options: [
      { label: "string && number", score: 0 },
      { label: "string | number", score: 1 },
      { label: "string => number", score: 0 },
      { label: "any[]", score: 0 },
    ],
  },
  {
    id: "debug-1",
    category: "debugging",
    prompt: "A feature suddenly breaks after a recent change. What is the best first move?",
    options: [
      { label: "Rewrite the feature from scratch immediately", score: 0 },
      { label: "Reproduce the issue and isolate the failing change", score: 1 },
      { label: "Add random console logs to every file", score: 0 },
      { label: "Ignore the error and continue building", score: 0 },
    ],
  },
  {
    id: "debug-2",
    category: "debugging",
    prompt: "If the browser console shows undefined is not a function, what does that usually suggest?",
    options: [
      { label: "A value is being called like a function when it is not one", score: 1 },
      { label: "The CSS selector is too specific", score: 0 },
      { label: "The network request was too fast", score: 0 },
      { label: "The page has no HTML body", score: 0 },
    ],
  },
];

const recommendations = {
  html_css: {
    beginner: {
      level: "Needs foundation work",
      nextSteps: "Practice semantic HTML, box model basics, and one-dimensional versus two-dimensional CSS layout patterns.",
      resources: [
        { label: "MDN: HTML elements reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element" },
        { label: "MDN: Basic concepts of Flexbox", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox" },
      ],
    },
    intermediate: {
      level: "Developing",
      nextSteps: "Build a responsive landing page and focus on semantic sections, spacing systems, and accessible forms.",
      resources: [
        { label: "MDN: Accessibility", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility" },
      ],
    },
    strong: {
      level: "Strong",
      nextSteps: "Move into advanced layout systems and component-level design consistency.",
      resources: [
        { label: "CSS Tricks guides", url: "https://css-tricks.com/guides/" },
      ],
    },
  },
  javascript: {
    beginner: {
      level: "Needs foundation work",
      nextSteps: "Focus on variables, arrays, objects, iteration, and pure functions before tackling app architecture.",
      resources: [
        { label: "MDN: JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
      ],
    },
    intermediate: {
      level: "Developing",
      nextSteps: "Practice transforming data, handling events, and writing small utility functions without side effects.",
      resources: [
        { label: "javascript.info", url: "https://javascript.info/" },
      ],
    },
    strong: {
      level: "Strong",
      nextSteps: "Strengthen asynchronous patterns and state management tradeoffs.",
      resources: [
        { label: "MDN: Promise", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" },
      ],
    },
  },
  react: {
    beginner: {
      level: "Needs foundation work",
      nextSteps: "Work on props, state, rendering, and event handling with very small components first.",
      resources: [
        { label: "React docs: Thinking in React", url: "https://react.dev/learn/thinking-in-react" },
      ],
    },
    intermediate: {
      level: "Developing",
      nextSteps: "Practice splitting UI into components and tracing how state flows through the tree.",
      resources: [
        { label: "React docs: Managing State", url: "https://react.dev/learn/managing-state" },
      ],
    },
    strong: {
      level: "Strong",
      nextSteps: "Move into performance, composition patterns, and data-fetching flows.",
      resources: [
        { label: "React docs", url: "https://react.dev/" },
      ],
    },
  },
  typescript: {
    beginner: {
      level: "Needs foundation work",
      nextSteps: "Start with primitive types, object types, unions, and function typing before advanced generics.",
      resources: [
        { label: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
      ],
    },
    intermediate: {
      level: "Developing",
      nextSteps: "Practice typing component props, API responses, and utility functions.",
      resources: [
        { label: "TypeScript Handbook: Everyday Types", url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html" },
      ],
    },
    strong: {
      level: "Strong",
      nextSteps: "Explore narrowing, generics, and type-safe state models.",
      resources: [
        { label: "TypeScript Handbook: Narrowing", url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html" },
      ],
    },
  },
  debugging: {
    beginner: {
      level: "Needs foundation work",
      nextSteps: "Practice reproducing bugs, reading console output, and isolating failing inputs before patching code.",
      resources: [
        { label: "Chrome DevTools docs", url: "https://developer.chrome.com/docs/devtools/" },
      ],
    },
    intermediate: {
      level: "Developing",
      nextSteps: "Work on narrowing failing cases and writing small reproducible test scenarios.",
      resources: [
        { label: "MDN: Debugging HTML", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Debugging_HTML" },
      ],
    },
    strong: {
      level: "Strong",
      nextSteps: "Focus on systematic debugging workflows and regression prevention.",
      resources: [
        { label: "web.dev: Debug JavaScript", url: "https://web.dev/articles/debug-javascript" },
      ],
    },
  },
};

const demoMode = new URLSearchParams(window.location.search).get("demo");
const state = {
  screen: "intro",
  currentQuestionIndex: 0,
  answers: new Array(questions.length).fill(null),
  result: null,
};

const app = document.getElementById("app");
const screenTitle = document.getElementById("screenTitle");
const restartBtn = document.getElementById("restartBtn");
const templates = {
  intro: document.getElementById("introTemplate"),
  quiz: document.getElementById("quizTemplate"),
  results: document.getElementById("resultsTemplate"),
};

function cloneTemplate(name) {
  return templates[name].content.cloneNode(true);
}

function render() {
  app.innerHTML = "";
  restartBtn.hidden = state.screen === "intro";

  if (state.screen === "intro") {
    screenTitle.textContent = "Ready to assess";
    renderIntro();
    return;
  }

  if (state.screen === "quiz") {
    screenTitle.textContent = "Assessment in progress";
    renderQuiz();
    return;
  }

  screenTitle.textContent = "Results and learning path";
  renderResults();
}

function renderIntro() {
  const fragment = cloneTemplate("intro");
  fragment.getElementById("startBtn").addEventListener("click", startAssessment);
  app.appendChild(fragment);
}

function renderQuiz() {
  const fragment = cloneTemplate("quiz");
  const question = questions[state.currentQuestionIndex];
  const selectedAnswer = state.answers[state.currentQuestionIndex];

  fragment.getElementById("questionCounter").textContent =
    `Question ${state.currentQuestionIndex + 1} of ${questions.length}`;
  fragment.getElementById("categoryPill").textContent = categories[question.category];
  fragment.getElementById("progressBar").style.width =
    `${((state.currentQuestionIndex + 1) / questions.length) * 100}%`;
  fragment.getElementById("questionPrompt").textContent = question.prompt;

  const optionList = fragment.getElementById("optionList");
  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = option.label;
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(selectedAnswer === optionIndex));

    if (selectedAnswer === optionIndex) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      state.answers[state.currentQuestionIndex] = optionIndex;
      render();
    });

    optionList.appendChild(button);
  });

  const backBtn = fragment.getElementById("backBtn");
  const nextBtn = fragment.getElementById("nextBtn");
  backBtn.disabled = state.currentQuestionIndex === 0;
  nextBtn.disabled = selectedAnswer === null;
  nextBtn.textContent = state.currentQuestionIndex === questions.length - 1 ? "See Results" : "Next";

  backBtn.addEventListener("click", () => {
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex -= 1;
      render();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (state.answers[state.currentQuestionIndex] === null) {
      return;
    }

    if (state.currentQuestionIndex === questions.length - 1) {
      state.result = evaluateAssessment();
      state.screen = "results";
    } else {
      state.currentQuestionIndex += 1;
    }

    render();
  });

  app.appendChild(fragment);
}

function renderResults() {
  const fragment = cloneTemplate("results");
  const { totalScore, totalPossible, strongestCategory, weakestCategories, categoryResults } = state.result;

  fragment.getElementById("summaryText").textContent =
    `You completed the assessment. Your strongest category is ${categories[strongestCategory]}. Focus next on ${weakestCategories
      .map((category) => categories[category])
      .join(" and ")} to raise your overall readiness.`;
  fragment.getElementById("totalScoreValue").textContent = `${totalScore}/${totalPossible}`;
  fragment.getElementById("topStrengthValue").textContent = categories[strongestCategory];

  const breakdownList = fragment.getElementById("scoreBreakdown");
  categoryResults.forEach((result) => {
    const item = document.createElement("div");
    item.className = "breakdown-item";
    const percentage = Math.round((result.score / result.total) * 100);
    item.innerHTML = `
      <div class="breakdown-top">
        <strong>${categories[result.category]}</strong>
        <span>${result.score}/${result.total}</span>
      </div>
      <div class="mini-track"><div class="mini-bar" style="width:${percentage}%"></div></div>
    `;
    breakdownList.appendChild(item);
  });

  const gapList = fragment.getElementById("gapList");
  weakestCategories.forEach((category) => {
    const categoryResult = categoryResults.find((result) => result.category === category);
    const card = document.createElement("article");
    card.className = "recommendation-card";
    card.innerHTML = `
      <h4>${categories[category]}</h4>
      <p>${describeGap(categoryResult)}</p>
    `;
    gapList.appendChild(card);
  });

  const recommendationList = fragment.getElementById("recommendationList");
  weakestCategories.forEach((category) => {
    const categoryResult = categoryResults.find((result) => result.category === category);
    const learningPlan = lookupRecommendation(category, categoryResult.score, categoryResult.total);
    const card = document.createElement("article");
    card.className = "recommendation-card";
    const resourceMarkup = learningPlan.resources
      .map((resource) => `<li><a href="${resource.url}" target="_blank" rel="noreferrer">${resource.label}</a></li>`)
      .join("");
    card.innerHTML = `
      <h4>${categories[category]} <span class="pill">${learningPlan.level}</span></h4>
      <p>${learningPlan.nextSteps}</p>
      <ul class="resource-list">${resourceMarkup}</ul>
    `;
    recommendationList.appendChild(card);
  });

  app.appendChild(fragment);
}

function startAssessment() {
  state.screen = "quiz";
  state.currentQuestionIndex = 0;
  state.answers = new Array(questions.length).fill(null);
  state.result = null;
  render();
}

function resetAssessment() {
  state.screen = "intro";
  state.currentQuestionIndex = 0;
  state.answers = new Array(questions.length).fill(null);
  state.result = null;
  render();
}

function evaluateAssessment() {
  const totals = {};

  questions.forEach((question, index) => {
    if (!totals[question.category]) {
      totals[question.category] = { score: 0, total: 0 };
    }

    const answerIndex = state.answers[index];
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

function lookupRecommendation(category, score, total) {
  const ratio = score / total;
  if (ratio < 0.5) {
    return recommendations[category].beginner;
  }
  if (ratio < 1) {
    return recommendations[category].intermediate;
  }
  return recommendations[category].strong;
}

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

function runDemo(mode) {
  const strategies = {
    perfect: questions.map((question) => question.options.findIndex((option) => option.score === 1)),
    mixed: [2, 0, 1, 2, 1, 1, 0, 1, 1, 0],
    weak: questions.map(() => 0),
  };

  const selectedAnswers = strategies[mode];
  if (!selectedAnswers) {
    return;
  }

  state.answers = selectedAnswers;
  state.currentQuestionIndex = questions.length - 1;
  state.result = evaluateAssessment();
  state.screen = "results";
  render();
}

restartBtn.addEventListener("click", resetAssessment);

window.render_game_to_text = function renderGameToText() {
  const answeredCount = state.answers.filter((answer) => answer !== null).length;
  return JSON.stringify({
    mode: state.screen,
    note: "UI app state, no spatial coordinate system",
    currentQuestionIndex: state.currentQuestionIndex,
    answeredCount,
    totalQuestions: questions.length,
    result: state.result,
  });
};

window.advanceTime = function advanceTime() {
  render();
};

render();
if (demoMode) {
  runDemo(demoMode);
}
