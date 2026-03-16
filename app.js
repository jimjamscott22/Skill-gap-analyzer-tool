const categories = {
  html_css: "HTML/CSS Fundamentals",
  javascript: "JavaScript Basics",
  react: "React / JSX Concepts",
  typescript: "TypeScript Basics",
  debugging: "Debugging & Problem Solving",
};

const assessmentLevels = {
  beginner: {
    label: "Beginner",
    subtitle: "Foundation check",
    description:
      "Best for learners who are early in their web-development journey and want to validate core concepts.",
    duration: "~3 minutes",
  },
  intermediate: {
    label: "Intermediate",
    subtitle: "Applied practice",
    description:
      "Best for learners who know the basics and want to test how well they can apply them in real work.",
    duration: "~4 minutes",
  },
  advanced: {
    label: "Advanced",
    subtitle: "Production readiness",
    description:
      "Best for learners who want a tougher pass through architecture, type safety, and debugging judgment.",
    duration: "~5 minutes",
  },
};

const assessmentQuestions = {
  beginner: [
    {
      id: "beg-html-1",
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
      id: "beg-html-2",
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
      id: "beg-js-1",
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
      id: "beg-js-2",
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
      id: "beg-react-1",
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
      id: "beg-react-2",
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
      id: "beg-ts-1",
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
      id: "beg-ts-2",
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
      id: "beg-debug-1",
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
      id: "beg-debug-2",
      category: "debugging",
      prompt: "If the browser console shows undefined is not a function, what does that usually suggest?",
      options: [
        { label: "A value is being called like a function when it is not one", score: 1 },
        { label: "The CSS selector is too specific", score: 0 },
        { label: "The network request was too fast", score: 0 },
        { label: "The page has no HTML body", score: 0 },
      ],
    },
  ],
  intermediate: [
    {
      id: "int-html-1",
      category: "html_css",
      prompt: "A page has a repeated card layout with consistent rows and columns. Which CSS approach is usually the best starting point?",
      options: [
        { label: "Position each card manually with top and left", score: 0 },
        { label: "CSS Grid for the overall layout", score: 1 },
        { label: "Use <table> for all card content", score: 0 },
        { label: "Rely on line breaks and margin hacks", score: 0 },
      ],
    },
    {
      id: "int-html-2",
      category: "html_css",
      prompt: "Which pattern most improves accessibility for a text input in a form?",
      options: [
        { label: "Relying on placeholder text only", score: 0 },
        { label: "Wrapping the input in a <div> with no label", score: 0 },
        { label: "Associating the input with a visible <label>", score: 1 },
        { label: "Using only color to indicate required fields", score: 0 },
      ],
    },
    {
      id: "int-js-1",
      category: "javascript",
      prompt: "What is the main difference between Array.forEach() and Array.map()?",
      options: [
        { label: "forEach always mutates the array but map never does", score: 0 },
        { label: "map returns a new array, while forEach is mainly for side effects", score: 1 },
        { label: "forEach is synchronous and map is asynchronous", score: 0 },
        { label: "map can only be used with numbers", score: 0 },
      ],
    },
    {
      id: "int-js-2",
      category: "javascript",
      prompt: "You need to wait for two API calls before rendering a screen. Which pattern is usually most appropriate?",
      options: [
        { label: "Promise.all() with async/await", score: 1 },
        { label: "setTimeout() with a long delay", score: 0 },
        { label: "A while loop that checks until both finish", score: 0 },
        { label: "JSON.stringify() both responses first", score: 0 },
      ],
    },
    {
      id: "int-react-1",
      category: "react",
      prompt: "A parent and two sibling components need the same editable data. What is usually the best approach first?",
      options: [
        { label: "Keep a separate copy of the state in each sibling", score: 0 },
        { label: "Lift the shared state to the nearest common parent", score: 1 },
        { label: "Store it only in CSS variables", score: 0 },
        { label: "Prevent re-renders with random keys", score: 0 },
      ],
    },
    {
      id: "int-react-2",
      category: "react",
      prompt: "When using useEffect, which dependency choice is safest when the effect reads a prop called userId?",
      options: [
        { label: "An empty dependency array every time", score: 0 },
        { label: "No dependency array so it runs on every render", score: 0 },
        { label: "Include userId in the dependency array", score: 1 },
        { label: "Include only setState functions", score: 0 },
      ],
    },
    {
      id: "int-ts-1",
      category: "typescript",
      prompt: "Which TypeScript feature is most useful when a value can be one of several defined string states like loading, success, or error?",
      options: [
        { label: "A union of string literals", score: 1 },
        { label: "A number index signature", score: 0 },
        { label: "The never type on every variable", score: 0 },
        { label: "A CSS module", score: 0 },
      ],
    },
    {
      id: "int-ts-2",
      category: "typescript",
      prompt: "Why is typing a function parameter better than leaving it as any in most cases?",
      options: [
        { label: "It guarantees the function will never fail", score: 0 },
        { label: "It helps the editor and compiler catch incorrect usage", score: 1 },
        { label: "It makes the function run faster in the browser", score: 0 },
        { label: "It removes the need for return values", score: 0 },
      ],
    },
    {
      id: "int-debug-1",
      category: "debugging",
      prompt: "A bug appears only when a filter is empty. What is the most useful next step?",
      options: [
        { label: "Create a minimal reproduction around the empty-filter case", score: 1 },
        { label: "Refactor unrelated files to simplify the project", score: 0 },
        { label: "Delete old branches before investigating", score: 0 },
        { label: "Assume the API is wrong and stop there", score: 0 },
      ],
    },
    {
      id: "int-debug-2",
      category: "debugging",
      prompt: "Which practice best reduces the chance of reintroducing a fixed bug later?",
      options: [
        { label: "Closing the ticket as soon as the error disappears locally", score: 0 },
        { label: "Adding a focused regression test or reproducible check", score: 1 },
        { label: "Renaming variables until the code looks cleaner", score: 0 },
        { label: "Suppressing warnings in the console", score: 0 },
      ],
    },
  ],
  advanced: [
    {
      id: "adv-html-1",
      category: "html_css",
      prompt: "A dashboard layout needs fixed side navigation and a flexible content area with dense two-dimensional placement. Which strategy is strongest?",
      options: [
        { label: "Use CSS Grid for the outer layout and flex where one-dimensional alignment is enough", score: 1 },
        { label: "Use only floats because they are more predictable", score: 0 },
        { label: "Avoid layout systems and place everything absolutely", score: 0 },
        { label: "Use multiple nested tables for the shell", score: 0 },
      ],
    },
    {
      id: "adv-html-2",
      category: "html_css",
      prompt: "Which change most improves keyboard accessibility for a custom clickable card component?",
      options: [
        { label: "Keeping it as a <div> and adding only a hover style", score: 0 },
        { label: "Using a semantic button or link and preserving visible focus styles", score: 1 },
        { label: "Disabling outlines so the design feels cleaner", score: 0 },
        { label: "Adding tabindex='-1' so it stays out of the tab order", score: 0 },
      ],
    },
    {
      id: "adv-js-1",
      category: "javascript",
      prompt: "A list render is derived from source data plus filters. What usually keeps the code easiest to reason about?",
      options: [
        { label: "Mutating the original array in multiple places before render", score: 0 },
        { label: "Computing a derived array from immutable inputs close to where it is used", score: 1 },
        { label: "Storing every intermediate version in global variables", score: 0 },
        { label: "Serializing and parsing the list on each interaction", score: 0 },
      ],
    },
    {
      id: "adv-js-2",
      category: "javascript",
      prompt: "You need to handle one failed request without losing successful results from several others. Which pattern is most appropriate?",
      options: [
        { label: "Promise.all() because it ignores rejections", score: 0 },
        { label: "Promise.allSettled() to inspect each outcome", score: 1 },
        { label: "A blocking alert() for each request", score: 0 },
        { label: "Nested callbacks with no error handling", score: 0 },
      ],
    },
    {
      id: "adv-react-1",
      category: "react",
      prompt: "A derived value can be calculated from current props and state during render. What is usually the best default?",
      options: [
        { label: "Store it in separate state and sync it with an effect", score: 0 },
        { label: "Compute it during render instead of duplicating state", score: 1 },
        { label: "Persist it to localStorage on every render", score: 0 },
        { label: "Move it to a global variable outside React", score: 0 },
      ],
    },
    {
      id: "adv-react-2",
      category: "react",
      prompt: "A list item component loses user input when the list reorders. What is the most likely cause?",
      options: [
        { label: "The component uses semantic HTML", score: 0 },
        { label: "The list items are using unstable keys such as array indexes", score: 1 },
        { label: "The parent passes props instead of context", score: 0 },
        { label: "The CSS uses gap instead of margin", score: 0 },
      ],
    },
    {
      id: "adv-ts-1",
      category: "typescript",
      prompt: "When working with data from an API, what is a strong reason to prefer a specific response type over any?",
      options: [
        { label: "It removes all need for runtime validation", score: 0 },
        { label: "It gives safer property access and clearer contracts across the app", score: 1 },
        { label: "It guarantees backend data is always correct", score: 0 },
        { label: "It makes TypeScript optional in other files", score: 0 },
      ],
    },
    {
      id: "adv-ts-2",
      category: "typescript",
      prompt: "A union type is narrowed inside an if statement that checks kind === 'loaded'. What is the main benefit?",
      options: [
        { label: "TypeScript can treat the value as the loaded variant in that branch", score: 1 },
        { label: "The code becomes asynchronous automatically", score: 0 },
        { label: "The union is converted into a tuple", score: 0 },
        { label: "All optional properties become required everywhere", score: 0 },
      ],
    },
    {
      id: "adv-debug-1",
      category: "debugging",
      prompt: "A production issue only occurs under slow network conditions. What is the strongest first investigation path?",
      options: [
        { label: "Throttle the network, reproduce the issue, and inspect timing-dependent state changes", score: 1 },
        { label: "Ignore timing because local fast runs are enough", score: 0 },
        { label: "Rename the component tree before testing", score: 0 },
        { label: "Minify the code manually and compare file sizes", score: 0 },
      ],
    },
    {
      id: "adv-debug-2",
      category: "debugging",
      prompt: "Several symptoms appear after a refactor. Which approach is most likely to reveal the root cause quickly?",
      options: [
        { label: "Revert random files until the app feels stable", score: 0 },
        { label: "Compare before-and-after behavior, narrow the failing path, and verify assumptions with targeted checks", score: 1 },
        { label: "Add console logs to every line in the repository", score: 0 },
        { label: "Start a full redesign because the codebase looks messy", score: 0 },
      ],
    },
  ],
};

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
const levelFromQuery = new URLSearchParams(window.location.search).get("level");
const defaultLevel = Object.hasOwn(assessmentLevels, levelFromQuery) ? levelFromQuery : "beginner";

const state = {
  screen: "intro",
  selectedLevel: defaultLevel,
  currentQuestionIndex: 0,
  answers: createEmptyAnswers(defaultLevel),
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

function createEmptyAnswers(level = state.selectedLevel) {
  return new Array(assessmentQuestions[level].length).fill(null);
}

function getLevelConfig(level = state.selectedLevel) {
  return assessmentLevels[level];
}

function getCurrentQuestions() {
  return assessmentQuestions[state.selectedLevel];
}

function cloneTemplate(name) {
  return templates[name].content.cloneNode(true);
}

function render() {
  app.innerHTML = "";
  restartBtn.hidden = state.screen === "intro";

  if (state.screen === "intro") {
    screenTitle.textContent = "Choose your assessment level";
    renderIntro();
    return;
  }

  if (state.screen === "quiz") {
    screenTitle.textContent = `${getLevelConfig().label} assessment in progress`;
    renderQuiz();
    return;
  }

  screenTitle.textContent = `${getLevelConfig().label} results and learning path`;
  renderResults();
}

function renderIntro() {
  const fragment = cloneTemplate("intro");
  const levelList = fragment.getElementById("assessmentLevelList");
  const levelDescription = fragment.getElementById("selectedLevelDescription");
  const levelQuestionCount = fragment.getElementById("selectedLevelQuestionCount");
  const levelDuration = fragment.getElementById("selectedLevelDuration");
  const startBtn = fragment.getElementById("startBtn");

  Object.entries(assessmentLevels).forEach(([levelKey, config]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "level-card";
    button.setAttribute("aria-pressed", String(state.selectedLevel === levelKey));

    if (state.selectedLevel === levelKey) {
      button.classList.add("selected");
    }

    button.innerHTML = `
      <span class="level-card-top">
        <strong>${config.label}</strong>
        <span class="pill subtle-pill">${config.subtitle}</span>
      </span>
      <span class="level-card-copy">${config.description}</span>
      <span class="level-card-meta">${assessmentQuestions[levelKey].length} questions • ${config.duration}</span>
    `;

    button.addEventListener("click", () => {
      state.selectedLevel = levelKey;
      state.currentQuestionIndex = 0;
      state.answers = createEmptyAnswers(levelKey);
      state.result = null;
      render();
    });

    levelList.appendChild(button);
  });

  levelDescription.textContent = getLevelConfig().description;
  levelQuestionCount.textContent = String(getCurrentQuestions().length);
  levelDuration.textContent = getLevelConfig().duration;
  startBtn.textContent = `Start ${getLevelConfig().label} Assessment`;
  startBtn.addEventListener("click", startAssessment);

  app.appendChild(fragment);
}

function renderQuiz() {
  const fragment = cloneTemplate("quiz");
  const questions = getCurrentQuestions();
  const question = questions[state.currentQuestionIndex];
  const selectedAnswer = state.answers[state.currentQuestionIndex];

  fragment.getElementById("questionCounter").textContent =
    `Question ${state.currentQuestionIndex + 1} of ${questions.length}`;
  fragment.getElementById("categoryPill").textContent = categories[question.category];
  fragment.getElementById("levelPill").textContent = `${getLevelConfig().label} track`;
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
  const levelConfig = getLevelConfig();

  fragment.getElementById("summaryText").textContent =
    `You completed the ${levelConfig.label.toLowerCase()} assessment. Your strongest category is ${categories[strongestCategory]}. Focus next on ${formatCategoryList(weakestCategories)} to raise your overall readiness.`;
  fragment.getElementById("assessmentLevelValue").textContent = levelConfig.label;
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
  state.answers = createEmptyAnswers();
  state.result = null;
  render();
}

function resetAssessment() {
  state.screen = "intro";
  state.currentQuestionIndex = 0;
  state.answers = createEmptyAnswers();
  state.result = null;
  render();
}

function evaluateAssessment() {
  const totals = {};
  const questions = getCurrentQuestions();

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

function formatCategoryList(categoryKeys) {
  if (categoryKeys.length === 1) {
    return categories[categoryKeys[0]];
  }

  return categoryKeys
    .map((category) => categories[category])
    .join(" and ");
}

function findCorrectAnswerIndex(question) {
  return question.options.findIndex((option) => option.score === 1);
}

function findIncorrectAnswerIndex(question) {
  return question.options.findIndex((option) => option.score === 0);
}

function runDemo(mode) {
  const questions = getCurrentQuestions();
  const strategies = {
    perfect: questions.map(findCorrectAnswerIndex),
    mixed: questions.map((question, index) => {
      if (index % 2 === 0) {
        return findCorrectAnswerIndex(question);
      }

      return findIncorrectAnswerIndex(question);
    }),
    weak: questions.map(findIncorrectAnswerIndex),
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
    selectedLevel: state.selectedLevel,
    currentQuestionIndex: state.currentQuestionIndex,
    answeredCount,
    totalQuestions: getCurrentQuestions().length,
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
