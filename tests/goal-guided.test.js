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
