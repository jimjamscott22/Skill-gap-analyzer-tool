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
      state.result = evaluateAssessment(state.answers, getCurrentQuestions());
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
    `You completed the ${levelConfig.label.toLowerCase()} assessment. Your strongest category is ${categories[strongestCategory]}. Focus next on ${formatCategoryList(weakestCategories, categories)} to raise your overall readiness.`;
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
    const learningPlan = lookupRecommendation(category, categoryResult.score, categoryResult.total, recommendations);
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
  state.result = evaluateAssessment(state.answers, getCurrentQuestions());
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
