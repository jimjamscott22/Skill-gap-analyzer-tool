# Goal-Guided Assessment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add career-goal onboarding, goal-specific question blocks, and goal-framed results to the static Skill Gap Analyzer app.

**Architecture:** Keep the app as vanilla HTML/CSS/JavaScript with data in `src/data`, shared calculations in `src/utils`, and DOM rendering in `src/app.js`. Add career-goal data and goal-question data as separate files, then compose the selected level's core questions with the selected goal's extra questions before scoring.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, browser localStorage, Node.js built-ins for optional lightweight tests.

---

## File Structure

- Create `src/data/career-goals.js`: Defines goal metadata, priority categories, setup copy, result copy, and next actions.
- Create `src/data/goal-questions.js`: Defines 2 extra questions per goal and level.
- Modify `index.html`: Loads the new data files before utilities and app code.
- Modify `src/utils/scoring.js`: Adds helpers for composing questions and interpreting goal readiness while preserving existing scoring behavior.
- Modify `src/app.js`: Adds selected goal state, goal query param support, composed question usage, history persistence, demo support, and result rendering.
- Modify `src/styles.css`: Adds card/tag styles for goal onboarding and the goal-readiness results panel.
- Create `tests/goal-guided.test.js`: Uses Node's `assert` and `vm` modules to test data, question composition, readiness interpretation, demo fallback helpers, and history entry shape.
- Create `tests/run-tests.js`: Minimal test runner for the static app's pure JavaScript helpers.
- Modify `README.md`: Documents the career-goal onboarding and new `goal=` demo query param.

### Task 1: Add Lightweight Test Harness

**Files:**
- Create: `tests/run-tests.js`
- Create: `tests/goal-guided.test.js`

- [ ] **Step 1: Create the test runner**

Create `tests/run-tests.js`:

```js
const fs = require("node:fs");
const path = require("node:path");

const testFiles = fs
  .readdirSync(__dirname)
  .filter((fileName) => fileName.endsWith(".test.js"))
  .sort();

let failures = 0;

for (const fileName of testFiles) {
  const testPath = path.join(__dirname, fileName);
  try {
    require(testPath);
    console.log(`PASS ${fileName}`);
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${fileName}`);
    console.error(error.stack || error.message);
  }
}

if (failures > 0) {
  process.exitCode = 1;
}
```

- [ ] **Step 2: Create failing tests for goal-guided helpers**

Create `tests/goal-guided.test.js`:

```js
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const rootDir = path.resolve(__dirname, "..");

function loadAppContext(files) {
  const context = {
    console,
    localStorage: {
      getItem() {
        return null;
      },
      setItem() {},
    },
    window: {
      location: {
        search: "",
      },
    },
    document: {
      getElementById() {
        return null;
      },
    },
    URLSearchParams,
  };
  vm.createContext(context);

  files.forEach((filePath) => {
    const source = fs.readFileSync(path.join(rootDir, filePath), "utf8");
    vm.runInContext(`${source}\n`, context, { filename: filePath });
  });

  vm.runInContext(
    `
    globalThis.__exports = {
      categories,
      assessmentQuestions,
      careerGoals,
      goalQuestions,
      getAssessmentQuestions,
      getDefaultGoal,
      createGoalReadinessSummary,
    };
    `,
    context,
  );

  return context;
}

const context = loadAppContext([
  "src/data/categories.js",
  "src/data/assessments.js",
  "src/data/career-goals.js",
  "src/data/goal-questions.js",
  "src/utils/scoring.js",
  "src/utils/formatting.js",
]);

const app = context.__exports;

assert.deepEqual(Object.keys(app.careerGoals), ["frontend", "react", "fullstack"]);
assert.equal(app.careerGoals.frontend.label, "Frontend Developer");
assert.deepEqual(app.careerGoals.react.priorityCategories, ["react", "typescript", "debugging"]);

const beginnerFrontendQuestions = app.getAssessmentQuestions("beginner", "frontend");
assert.equal(beginnerFrontendQuestions.length, app.assessmentQuestions.beginner.length + 2);
assert.equal(beginnerFrontendQuestions.at(-1).id.startsWith("goal-frontend-beg-"), true);

const advancedReactQuestions = app.getAssessmentQuestions("advanced", "react");
assert.equal(advancedReactQuestions.length, app.assessmentQuestions.advanced.length + 2);

const missingGoalQuestions = app.getAssessmentQuestions("beginner", "unknown-goal");
assert.equal(missingGoalQuestions.length, app.assessmentQuestions.beginner.length);

assert.equal(app.getDefaultGoal("react"), "react");
assert.equal(app.getDefaultGoal("not-real"), "frontend");

const categoryResults = [
  { category: "react", score: 2, total: 3 },
  { category: "typescript", score: 1, total: 3 },
  { category: "debugging", score: 3, total: 3 },
  { category: "html_css", score: 3, total: 3 },
];
const readiness = app.createGoalReadinessSummary("react", categoryResults, app.careerGoals, app.categories);
assert.equal(readiness.goalLabel, "React Developer");
assert.equal(readiness.priorityScores.length, 3);
assert.equal(readiness.priorityScores[0].category, "React / JSX Concepts");
assert.equal(readiness.nextActions.length, 3);
assert.match(readiness.message, /React Developer/);
```

- [ ] **Step 3: Run tests and verify they fail because files/functions do not exist**

Run:

```bash
node tests/run-tests.js
```

Expected: `FAIL goal-guided.test.js` with an `ENOENT` message for `src/data/career-goals.js`.

- [ ] **Step 4: Commit the failing harness**

Run:

```bash
git add tests/run-tests.js tests/goal-guided.test.js
git commit -m "test: add goal-guided assessment coverage"
```

### Task 2: Add Career Goal And Goal Question Data

**Files:**
- Create: `src/data/career-goals.js`
- Create: `src/data/goal-questions.js`
- Modify: `index.html`

- [ ] **Step 1: Add career goal data**

Create `src/data/career-goals.js`:

```js
const careerGoals = {
  frontend: {
    label: "Frontend Developer",
    description: "Build accessible, responsive interfaces with strong HTML, CSS, JavaScript, and debugging habits.",
    setupCopy: "Best if you want a broad browser-focused path across layout, interaction, accessibility, and practical UI work.",
    priorityCategories: ["html_css", "javascript", "debugging"],
    resultFrame:
      "Frontend Developer readiness depends on reliable layout fundamentals, JavaScript fluency, and the ability to debug user-facing issues.",
    nextActions: [
      "Build one responsive page from a static mockup.",
      "Add form validation and keyboard-friendly interactions.",
      "Debug a broken layout using browser DevTools before changing code.",
    ],
  },
  react: {
    label: "React Developer",
    description: "Focus on components, state, effects, TypeScript, and production-minded UI architecture.",
    setupCopy: "Best if you want to grow from JavaScript foundations into component-driven application work.",
    priorityCategories: ["react", "typescript", "debugging"],
    resultFrame:
      "React Developer readiness depends on component reasoning, state flow, type confidence, and systematic debugging.",
    nextActions: [
      "Refactor a repeated UI section into reusable components.",
      "Type component props and shared state with TypeScript.",
      "Trace a state bug from user action to rendered output.",
    ],
  },
  fullstack: {
    label: "Full-Stack Developer",
    description: "Connect frontend skills with API thinking, data flow, type safety, and end-to-end debugging.",
    setupCopy: "Best if you want to understand how browser interfaces connect to services, data, and real app workflows.",
    priorityCategories: ["javascript", "typescript", "debugging"],
    resultFrame:
      "Full-Stack Developer readiness depends on JavaScript fundamentals, type-safe data handling, and debugging across boundaries.",
    nextActions: [
      "Mock an API response and render loading, success, and error states.",
      "Type a response object and validate assumptions before rendering.",
      "Practice isolating whether a bug belongs to UI state, data shape, or request timing.",
    ],
  },
};
```

- [ ] **Step 2: Add goal-specific questions**

Create `src/data/goal-questions.js`:

```js
const goalQuestions = {
  frontend: {
    beginner: [
      {
        id: "goal-frontend-beg-1",
        category: "html_css",
        prompt: "A button uses color alone to show an error state. What should you add first?",
        options: [
          { label: "A text label or message that explains the error", score: 1 },
          { label: "A faster animation", score: 0 },
          { label: "A larger shadow", score: 0 },
          { label: "A random icon with no label", score: 0 },
        ],
      },
      {
        id: "goal-frontend-beg-2",
        category: "debugging",
        weight: ELEVATED_QUESTION_WEIGHT,
        prompt: "A page looks broken only on small screens. What is the best first debugging move?",
        options: [
          { label: "Open responsive DevTools and inspect the element sizes", score: 1 },
          { label: "Delete all media queries immediately", score: 0 },
          { label: "Add z-index to every element", score: 0 },
          { label: "Assume the browser is wrong", score: 0 },
        ],
      },
    ],
    intermediate: [
      {
        id: "goal-frontend-int-1",
        category: "html_css",
        prompt: "Which pattern best supports a reusable responsive card grid?",
        options: [
          { label: "CSS Grid with repeatable tracks and sensible gaps", score: 1 },
          { label: "Absolute positioning every card", score: 0 },
          { label: "Line breaks between cards", score: 0 },
          { label: "One table row per card", score: 0 },
        ],
      },
      {
        id: "goal-frontend-int-2",
        category: "javascript",
        weight: ELEVATED_QUESTION_WEIGHT,
        prompt: "A filter UI updates a visible list. Where should the filtered items usually come from?",
        options: [
          { label: "Derived from the original data and selected filter", score: 1 },
          { label: "Manually copied into a second permanent array", score: 0 },
          { label: "Stored only in CSS classes", score: 0 },
          { label: "Fetched again after every keypress in all cases", score: 0 },
        ],
      },
    ],
    advanced: [
      {
        id: "goal-frontend-adv-1",
        category: "html_css",
        prompt: "A design system component needs predictable spacing across screens. What is the best approach?",
        options: [
          { label: "Use shared spacing tokens and responsive constraints", score: 1 },
          { label: "Tune every page with unrelated one-off margins", score: 0 },
          { label: "Use negative spacing until it looks close", score: 0 },
          { label: "Disable wrapping everywhere", score: 0 },
        ],
      },
      {
        id: "goal-frontend-adv-2",
        category: "debugging",
        weight: ELEVATED_QUESTION_WEIGHT,
        prompt: "A layout regression appears after a component style change. What should you inspect first?",
        options: [
          { label: "The changed component's computed styles and affected layout parents", score: 1 },
          { label: "Unrelated API response timing", score: 0 },
          { label: "Only the favicon", score: 0 },
          { label: "All JavaScript dependencies at once", score: 0 },
        ],
      },
    ],
  },
  react: {
    beginner: [
      {
        id: "goal-react-beg-1",
        category: "react",
        prompt: "What is the best reason to split UI into React components?",
        options: [
          { label: "To make repeated interface pieces easier to reuse and reason about", score: 1 },
          { label: "To remove all JavaScript from the app", score: 0 },
          { label: "To make CSS impossible to use", score: 0 },
          { label: "To avoid rendering HTML", score: 0 },
        ],
      },
      {
        id: "goal-react-beg-2",
        category: "typescript",
        weight: ELEVATED_QUESTION_WEIGHT,
        prompt: "What should TypeScript props describe?",
        options: [
          { label: "The values a component expects to receive", score: 1 },
          { label: "Only the component's CSS file name", score: 0 },
          { label: "The browser version", score: 0 },
          { label: "The exact monitor size", score: 0 },
        ],
      },
    ],
    intermediate: [
      {
        id: "goal-react-int-1",
        category: "react",
        prompt: "A component fetches data when userId changes. What should the effect depend on?",
        options: [
          { label: "The userId value used by the fetch", score: 1 },
          { label: "An unrelated random number", score: 0 },
          { label: "Nothing, even though userId can change", score: 0 },
          { label: "Only CSS class names", score: 0 },
        ],
      },
      {
        id: "goal-react-int-2",
        category: "debugging",
        weight: ELEVATED_QUESTION_WEIGHT,
        prompt: "A React list shows stale rows after sorting. What should you check first?",
        options: [
          { label: "Whether each row uses a stable key tied to item identity", score: 1 },
          { label: "Whether every item has a random key", score: 0 },
          { label: "Whether the body tag has enough margin", score: 0 },
          { label: "Whether the browser cache stores JSX", score: 0 },
        ],
      },
    ],
    advanced: [
      {
        id: "goal-react-adv-1",
        category: "react",
        prompt: "A page has many unrelated state updates. What usually improves maintainability?",
        options: [
          { label: "Group related state by feature and derive values where possible", score: 1 },
          { label: "Store every value globally by default", score: 0 },
          { label: "Duplicate state in every child component", score: 0 },
          { label: "Avoid naming state values clearly", score: 0 },
        ],
      },
      {
        id: "goal-react-adv-2",
        category: "typescript",
        weight: ELEVATED_QUESTION_WEIGHT,
        prompt: "A component accepts one of three visual variants. Which type is most precise?",
        options: [
          { label: "\"primary\" | \"secondary\" | \"danger\"", score: 1 },
          { label: "string for every possible value", score: 0 },
          { label: "number[]", score: 0 },
          { label: "any", score: 0 },
        ],
      },
    ],
  },
  fullstack: {
    beginner: [
      {
        id: "goal-fullstack-beg-1",
        category: "javascript",
        prompt: "What format is most common for data returned by a web API to frontend JavaScript?",
        options: [
          { label: "JSON", score: 1 },
          { label: "CSS", score: 0 },
          { label: "PNG only", score: 0 },
          { label: "Font files", score: 0 },
        ],
      },
      {
        id: "goal-fullstack-beg-2",
        category: "debugging",
        weight: ELEVATED_QUESTION_WEIGHT,
        prompt: "A request fails in the browser. What should you check first?",
        options: [
          { label: "The Network tab for status code and response details", score: 1 },
          { label: "Only the page background color", score: 0 },
          { label: "Whether every variable is named data", score: 0 },
          { label: "The font weight", score: 0 },
        ],
      },
    ],
    intermediate: [
      {
        id: "goal-fullstack-int-1",
        category: "typescript",
        prompt: "Why type an API response object?",
        options: [
          { label: "To document and check the shape the UI expects", score: 1 },
          { label: "To make the server optional in every app", score: 0 },
          { label: "To turn JSON into CSS", score: 0 },
          { label: "To prevent all network errors", score: 0 },
        ],
      },
      {
        id: "goal-fullstack-int-2",
        category: "javascript",
        weight: ELEVATED_QUESTION_WEIGHT,
        prompt: "A UI needs loading, success, and error states for a request. What is the cleanest model?",
        options: [
          { label: "Represent the request as a small set of explicit states", score: 1 },
          { label: "Use one boolean called done for every situation", score: 0 },
          { label: "Hide errors from users", score: 0 },
          { label: "Render success before the request starts", score: 0 },
        ],
      },
    ],
    advanced: [
      {
        id: "goal-fullstack-adv-1",
        category: "typescript",
        prompt: "A backend may return either success data or an error object. Which model is safest?",
        options: [
          { label: "A discriminated union for success and error responses", score: 1 },
          { label: "Assume every response is successful", score: 0 },
          { label: "Use any and skip checks", score: 0 },
          { label: "Convert every response to a string immediately", score: 0 },
        ],
      },
      {
        id: "goal-fullstack-adv-2",
        category: "debugging",
        weight: ELEVATED_QUESTION_WEIGHT,
        prompt: "A page renders empty data after an API change. What should you compare first?",
        options: [
          { label: "The expected response shape against the actual network response", score: 1 },
          { label: "Only the border radius", score: 0 },
          { label: "The order of unrelated script tags", score: 0 },
          { label: "Whether the app has a favicon", score: 0 },
        ],
      },
    ],
  },
};
```

- [ ] **Step 3: Load new data files in the page**

Modify the data script block in `index.html` to this order:

```html
  <!-- Data files -->
  <script src="src/data/categories.js"></script>
  <script src="src/data/assessments.js"></script>
  <script src="src/data/career-goals.js"></script>
  <script src="src/data/goal-questions.js"></script>
  <script src="src/data/recommendations.js"></script>
```

- [ ] **Step 4: Run tests and verify the failure has moved to missing helper functions**

Run:

```bash
node tests/run-tests.js
```

Expected: `FAIL goal-guided.test.js` with `context.getAssessmentQuestions is not a function`.

- [ ] **Step 5: Commit data files**

Run:

```bash
git add index.html src/data/career-goals.js src/data/goal-questions.js
git commit -m "feat: add career goal assessment data"
```

### Task 3: Add Question Composition And Readiness Helpers

**Files:**
- Modify: `src/utils/scoring.js`

- [ ] **Step 1: Add helper functions**

Append these functions to `src/utils/scoring.js`:

```js
function getDefaultGoal(goalKey) {
  return Object.hasOwn(careerGoals, goalKey) ? goalKey : "frontend";
}

function getAssessmentQuestions(level, goalKey) {
  const coreQuestions = assessmentQuestions[level] || [];
  const selectedGoal = getDefaultGoal(goalKey);
  const focusedQuestions = goalQuestions[selectedGoal]?.[level] || [];
  return [...coreQuestions, ...focusedQuestions];
}

function createGoalReadinessSummary(goalKey, categoryResults, careerGoals, categories) {
  const selectedGoal = careerGoals[getDefaultGoal(goalKey)];
  const priorityScores = selectedGoal.priorityCategories.map((categoryKey) => {
    const result = categoryResults.find((item) => item.category === categoryKey) || {
      category: categoryKey,
      score: 0,
      total: 0,
    };
    const percentage = result.total ? Math.round((result.score / result.total) * 100) : 0;
    return {
      category: categories[categoryKey],
      score: result.score,
      total: result.total,
      percentage,
    };
  });

  const averagePriorityScore = priorityScores.length
    ? Math.round(
        priorityScores.reduce((sum, item) => sum + item.percentage, 0) / priorityScores.length,
      )
    : 0;

  return {
    goalLabel: selectedGoal.label,
    message: `${selectedGoal.label} readiness: ${selectedGoal.resultFrame} Your priority-category average is ${averagePriorityScore}%.`,
    priorityScores,
    nextActions: selectedGoal.nextActions,
  };
}
```

- [ ] **Step 2: Run tests and verify they pass**

Run:

```bash
node tests/run-tests.js
```

Expected: `PASS goal-guided.test.js`.

- [ ] **Step 3: Commit helper functions**

Run:

```bash
git add src/utils/scoring.js tests/goal-guided.test.js
git commit -m "feat: compose goal-guided assessment questions"
```

### Task 4: Wire Goal State Into The App Flow

**Files:**
- Modify: `src/app.js`

- [ ] **Step 1: Add goal query parsing and state**

At the top of `src/app.js`, replace the repeated `new URLSearchParams` calls with:

```js
const queryParams = new URLSearchParams(window.location.search);
const demoMode = queryParams.get("demo");
const levelFromQuery = queryParams.get("level");
const goalFromQuery = queryParams.get("goal");
const defaultLevel = Object.hasOwn(assessmentLevels, levelFromQuery) ? levelFromQuery : "beginner";
const defaultGoal = getDefaultGoal(goalFromQuery);
const HISTORY_STORAGE_KEY = "skillGapHistory";
const HISTORY_LIMIT = 10;
```

Add `selectedGoal` to `state`:

```js
const state = {
  screen: "intro",
  selectedLevel: defaultLevel,
  selectedGoal: defaultGoal,
  currentQuestionIndex: 0,
  answers: createEmptyAnswers(defaultLevel, defaultGoal),
  result: null,
  history: loadAssessmentHistory(),
};
```

- [ ] **Step 2: Update question helpers**

Replace `createEmptyAnswers` and `getCurrentQuestions` with:

```js
function createEmptyAnswers(level = state.selectedLevel, goalKey = state.selectedGoal) {
  return new Array(getAssessmentQuestions(level, goalKey).length).fill(null);
}

function getCurrentQuestions() {
  return getAssessmentQuestions(state.selectedLevel, state.selectedGoal);
}
```

- [ ] **Step 3: Persist selected goal in history**

Update `createHistoryEntry` so it includes `goal`:

```js
function createHistoryEntry(result) {
  return {
    timestamp: new Date().toISOString(),
    level: state.selectedLevel,
    goal: state.selectedGoal,
    totalScore: result.totalScore,
    totalPossible: result.totalPossible,
    strongestCategory: result.strongestCategory,
    weakestCategories: result.weakestCategories,
    categoryResults: result.categoryResults,
  };
}
```

- [ ] **Step 4: Update reset/start answer creation**

In the level-card click handler, `startAssessment`, and `resetAssessment`, call `createEmptyAnswers()` after state values have been updated. The final versions should be:

```js
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
```

- [ ] **Step 5: Run tests and browser smoke check**

Run:

```bash
node tests/run-tests.js
node dev/tmp_static_server.js
```

Expected tests: `PASS goal-guided.test.js`.

Expected browser check at `http://127.0.0.1:4173/?goal=react&level=intermediate&demo=mixed`: results render without console errors and the serialized `window.render_game_to_text()` output includes `"selectedLevel":"intermediate"` and `"totalQuestions":12`.

- [ ] **Step 6: Commit app state wiring**

Run:

```bash
git add src/app.js
git commit -m "feat: track selected career goal"
```

### Task 5: Render Goal Selection In Onboarding

**Files:**
- Modify: `index.html`
- Modify: `src/app.js`
- Modify: `src/styles.css`

- [ ] **Step 1: Update intro template markup**

In `index.html`, replace the intro template's right panel content with this structure:

```html
      <div class="panel">
        <h3>Choose your career goal</h3>
        <div id="careerGoalList" class="goal-list"></div>
        <div class="goal-summary">
          <p id="selectedGoalDescription"></p>
          <div id="selectedGoalTags" class="tag-list"></div>
        </div>

        <h3>Pick your level</h3>
        <div id="assessmentLevelList" class="level-list"></div>
        <div class="level-summary">
          <p id="selectedLevelDescription"></p>
          <div class="hero-meta compact-meta">
            <span><strong id="selectedLevelQuestionCount"></strong> questions</span>
            <span id="selectedLevelDuration"></span>
          </div>
        </div>
        <button id="startBtn" class="primary-button" type="button">Start Assessment</button>
      </div>
```

- [ ] **Step 2: Render goal cards in `renderIntro`**

At the start of `renderIntro`, add these DOM references:

```js
  const careerGoalList = fragment.getElementById("careerGoalList");
  const goalDescription = fragment.getElementById("selectedGoalDescription");
  const goalTags = fragment.getElementById("selectedGoalTags");
```

Before rendering level cards, add:

```js
  Object.entries(careerGoals).forEach(([goalKey, config]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "goal-card";
    button.setAttribute("aria-pressed", String(state.selectedGoal === goalKey));

    if (state.selectedGoal === goalKey) {
      button.classList.add("selected");
    }

    button.innerHTML = `
      <span class="level-card-top">
        <strong>${config.label}</strong>
      </span>
      <span class="level-card-copy">${config.description}</span>
      <span class="tag-list">${config.priorityCategories
        .map((category) => `<span class="skill-tag">${categories[category]}</span>`)
        .join("")}</span>
    `;

    button.addEventListener("click", () => {
      state.selectedGoal = goalKey;
      state.currentQuestionIndex = 0;
      state.answers = createEmptyAnswers();
      state.result = null;
      render();
    });

    careerGoalList.appendChild(button);
  });
```

After rendering cards, set the selected goal summary:

```js
  const goalConfig = careerGoals[state.selectedGoal];
  goalDescription.textContent = goalConfig.setupCopy;
  goalTags.innerHTML = goalConfig.priorityCategories
    .map((category) => `<span class="skill-tag">${categories[category]}</span>`)
    .join("");
```

- [ ] **Step 3: Update intro count and button copy**

Keep using `getCurrentQuestions()` for the count and change start button copy:

```js
  levelQuestionCount.textContent = String(getCurrentQuestions().length);
  levelDuration.textContent = getLevelConfig().duration;
  startBtn.textContent = `Start ${careerGoals[state.selectedGoal].label} Assessment`;
```

- [ ] **Step 4: Add onboarding styles**

Add these styles near the existing `.level-list` and card styles in `src/styles.css`:

```css
.goal-list,
.level-list {
  display: grid;
  gap: 12px;
}

.goal-summary,
.level-summary {
  margin: 14px 0 22px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 7px 9px;
  border-radius: 999px;
  background: rgba(41, 114, 87, 0.1);
  color: var(--success);
  font-family: "IBM Plex Mono", monospace;
  font-size: 0.72rem;
  text-transform: uppercase;
}

.goal-card {
  width: 100%;
  display: grid;
  gap: 10px;
  padding: 16px;
  text-align: left;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid var(--line);
}

.goal-card.selected,
.level-card.selected {
  background: var(--surface-strong);
  outline: 2px solid var(--accent);
  box-shadow: 0 12px 24px rgba(203, 81, 34, 0.12);
}
```

- [ ] **Step 5: Run browser smoke check**

Run:

```bash
node dev/tmp_static_server.js
```

Expected browser check at `http://127.0.0.1:4173`: intro displays three goal cards, three level cards, and the question count is `12 questions` after any goal is selected.

- [ ] **Step 6: Commit onboarding UI**

Run:

```bash
git add index.html src/app.js src/styles.css
git commit -m "feat: add career goal onboarding"
```

### Task 6: Show Goal Context During Quiz

**Files:**
- Modify: `index.html`
- Modify: `src/app.js`
- Modify: `src/styles.css`

- [ ] **Step 1: Add a goal pill to quiz template**

In `index.html`, update the quiz template pill group:

```html
        <div class="pill-group">
          <span id="goalPill" class="pill subtle-pill"></span>
          <span id="levelPill" class="pill subtle-pill"></span>
          <span id="categoryPill" class="pill"></span>
          <span id="focusPill" class="pill focus-pill" hidden>Goal Focus</span>
        </div>
```

- [ ] **Step 2: Render goal and focus labels**

In `renderQuiz`, add:

```js
  const coreQuestionCount = assessmentQuestions[state.selectedLevel].length;
  const isGoalQuestion = state.currentQuestionIndex >= coreQuestionCount;
  fragment.getElementById("goalPill").textContent = careerGoals[state.selectedGoal].label;
  fragment.getElementById("focusPill").hidden = !isGoalQuestion;
```

- [ ] **Step 3: Add focus pill style**

Add to `src/styles.css`:

```css
.focus-pill {
  background: rgba(41, 114, 87, 0.14);
  color: var(--success);
}
```

- [ ] **Step 4: Run smoke check**

Run:

```bash
node dev/tmp_static_server.js
```

Expected browser check: start a React intermediate assessment and advance to question 11. The pill group shows `React Developer`, `Intermediate track`, the current category, and `Goal Focus`.

- [ ] **Step 5: Commit quiz context UI**

Run:

```bash
git add index.html src/app.js src/styles.css
git commit -m "feat: show goal context during quiz"
```

### Task 7: Add Goal Readiness Results Panel

**Files:**
- Modify: `index.html`
- Modify: `src/app.js`
- Modify: `src/styles.css`

- [ ] **Step 1: Add results template panel**

In `index.html`, add this section at the top of `resultsTemplate`, before the existing `.results-grid`:

```html
    <section class="panel goal-readiness-panel">
      <div>
        <p class="app-label">Goal Readiness</p>
        <h3 id="goalReadinessTitle"></h3>
        <p id="goalReadinessMessage"></p>
      </div>
      <div id="priorityScoreList" class="priority-score-list"></div>
      <div>
        <h3>Next actions</h3>
        <ul id="goalActionList" class="clean-list"></ul>
      </div>
    </section>
```

- [ ] **Step 2: Render readiness panel**

In `renderResults`, after `const levelConfig = getLevelConfig();`, add:

```js
  const readiness = createGoalReadinessSummary(
    state.selectedGoal,
    categoryResults,
    careerGoals,
    categories,
  );
```

Then set the readiness DOM:

```js
  fragment.getElementById("goalReadinessTitle").textContent = readiness.goalLabel;
  fragment.getElementById("goalReadinessMessage").textContent = readiness.message;

  const priorityScoreList = fragment.getElementById("priorityScoreList");
  readiness.priorityScores.forEach((item) => {
    const score = document.createElement("div");
    score.className = "priority-score";
    score.innerHTML = `
      <span>${item.category}</span>
      <strong>${item.percentage}%</strong>
    `;
    priorityScoreList.appendChild(score);
  });

  const goalActionList = fragment.getElementById("goalActionList");
  readiness.nextActions.forEach((action) => {
    const item = document.createElement("li");
    item.textContent = action;
    goalActionList.appendChild(item);
  });
```

Update the existing summary text to mention the goal:

```js
  fragment.getElementById("summaryText").textContent =
    `You completed the ${levelConfig.label.toLowerCase()} assessment for the ${careerGoals[state.selectedGoal].label} path. Your strongest category is ${categories[strongestCategory]}. Focus next on ${formatCategoryList(weakestCategories, categories)} to raise your overall readiness.`;
```

- [ ] **Step 3: Add readiness panel styles**

Add to `src/styles.css`:

```css
.goal-readiness-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(180px, 0.8fr) minmax(0, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  background: var(--surface-strong);
}

.priority-score-list {
  display: grid;
  gap: 10px;
}

.priority-score {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.58);
}
```

Inside the existing mobile media query, add:

```css
  .goal-readiness-panel {
    grid-template-columns: 1fr;
  }
```

- [ ] **Step 4: Run tests and demo checks**

Run:

```bash
node tests/run-tests.js
node dev/tmp_static_server.js
```

Expected tests: `PASS goal-guided.test.js`.

Expected browser check at `http://127.0.0.1:4173/?goal=fullstack&level=advanced&demo=perfect`: results show a `Goal Readiness` panel titled `Full-Stack Developer`, priority scores, and next actions.

- [ ] **Step 5: Commit results panel**

Run:

```bash
git add index.html src/app.js src/styles.css
git commit -m "feat: add goal readiness results"
```

### Task 8: Document Goal Demo URLs And Final Verification

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update README feature list**

In `README.md`, add these bullets under "What it does":

```md
- lets the learner choose a career goal: frontend, React, or full-stack
- adds a short goal-specific question block to the selected assessment
- frames results with goal-specific readiness guidance
```

- [ ] **Step 2: Update demo URL docs**

In `README.md`, add:

```md
- optional `?goal=frontend|react|fullstack`
```

Add examples:

```text
http://127.0.0.1:4173/?goal=react&level=intermediate&demo=mixed
http://127.0.0.1:4173/?goal=fullstack&level=advanced&demo=perfect
```

- [ ] **Step 3: Run final automated verification**

Run:

```bash
node tests/run-tests.js
```

Expected: `PASS goal-guided.test.js`.

- [ ] **Step 4: Run final browser verification**

Run:

```bash
node dev/tmp_static_server.js
```

Open these URLs:

```text
http://127.0.0.1:4173
http://127.0.0.1:4173/?goal=react&level=intermediate&demo=mixed
http://127.0.0.1:4173/?goal=fullstack&level=advanced&demo=weak
http://127.0.0.1:4173/?goal=invalid&level=invalid&demo=perfect
```

Expected:

- Intro shows goal cards and level cards.
- Demo result pages render without console errors.
- Invalid goal and level fall back to Frontend Developer and Beginner.
- `window.render_game_to_text()` reports `totalQuestions: 12` for valid goal-guided assessments.

- [ ] **Step 5: Commit docs**

Run:

```bash
git add README.md
git commit -m "docs: describe goal-guided assessment flow"
```

- [ ] **Step 6: Review final git status**

Run:

```bash
git status --short
```

Expected: only intentionally untracked local artifacts remain, such as `.superpowers/` if present.
