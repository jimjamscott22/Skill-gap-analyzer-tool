# Skill Gap Analyzer Tool

A portfolio-ready frontend MVP that assesses web development knowledge, identifies skill gaps, and turns the results into a practical next-step learning path.

This project was built as a lean prototype to prove a full assessment loop in a simple static app: introduce the user to the tool, run a short categorized quiz, score the results, identify weak areas, and recommend what to learn next.

## Suggested GitHub Metadata

**Repository description**

A static web app that assesses web development skills, identifies knowledge gaps, and generates a simple personalized learning path.

**Suggested topics**

`javascript` `html` `css` `frontend` `learning-tool` `quiz-app` `portfolio-project` `education`

## Live Project Snapshot

**What it does**

- guides a learner through a 10-question assessment
- lets the learner choose beginner, intermediate, or advanced assessment tracks
- scores answers across 5 web-development categories
- highlights strongest and weakest skill areas
- generates rule-based learning recommendations
- presents the results in a responsive, polished UI

**Why this project is interesting**

This app focuses on a real product problem rather than just UI rendering: how to take structured user input, transform it into meaningful feedback, and present that feedback in a way that feels actionable for different learner levels.

It also shows a few strengths that are useful in portfolio work:

- product thinking around an MVP feature set
- clean separation of content, scoring, and presentation
- plain JavaScript state management without a framework
- responsive interface design
- extensible data-driven quiz and recommendation model

## Demo

If you want to preview the results screen quickly, the app supports demo modes:

- `?demo=perfect`
- `?demo=mixed`
- `?demo=weak`
- optional `?level=beginner|intermediate|advanced`

Examples:

```text
http://127.0.0.1:4173/?demo=perfect
http://127.0.0.1:4173/?level=intermediate&demo=mixed
http://127.0.0.1:4173/?level=advanced&demo=weak
```

## Screens and User Flow

### 1. Landing Screen

The intro screen explains the purpose of the tool, the topics it covers, and the expected time commitment.

### 2. Quiz Flow

The assessment presents one question at a time with:

- visible progress
- category labeling
- answer selection state
- back and next navigation

### 3. Results Screen

After completion, the app shows:

- total score
- strongest category
- category-by-category performance bars
- weakest areas to focus on
- learning recommendations and resource links

## Skills Assessed

The current MVP covers five areas:

- HTML/CSS Fundamentals
- JavaScript Basics
- React / JSX Concepts
- TypeScript Basics
- Debugging & Problem Solving

Each assessment level currently includes two questions per category.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Node.js only for the optional local static server

No framework or build step is required.

## Project Structure

```text
.
|-- .gitignore
|-- LICENSE
|-- README.md
|-- app.js
|-- index.html
|-- progress.md
|-- styles.css
`-- tmp_static_server.js
```

## Key Implementation Details

### Data-Driven Assessment Model

Assessment levels, questions, categories, and recommendation content all live in JavaScript objects inside `app.js`. That makes the app easy to expand without rewriting the rendering logic.

### Simple State Management

The app uses a small in-memory state object to track:

- active screen
- current question index
- selected answers
- computed assessment result

This keeps the MVP understandable while still supporting a complete multi-step flow.

### Assessment History

Each completed assessment is stored in `localStorage` with the selected level, totals, and per-category results. The results summary shows how many sessions are currently saved, keeping progress local to the browser.

### Scoring Logic

Each answer carries a numeric score, and some questions apply a higher weight. The current data gives the second question in each category a 2x weight (`ELEVATED_QUESTION_WEIGHT`) to emphasize the more applied prompt. The final category totals use the max score per question multiplied by its weight, so higher-priority questions have more influence. The app totals scores by category, ranks the categories, identifies the two weakest areas, and maps those areas to recommendation content.

### Recommendation Engine

Recommendations are rule-based and intentionally lightweight.

Each category includes three levels:

- `beginner`
- `intermediate`
- `strong`

The recommendation level is chosen by score ratio:

- below `0.5` => beginner
- below `1.0` => intermediate
- `1.0` => strong

This is a practical MVP tradeoff: simple enough to maintain, but structured enough to feel personalized.

## Running the Project Locally

### Option 1: Open directly

Open `index.html` in a browser.

### Option 2: Use the included static server

From the project directory:

```powershell
node tmp_static_server.js
```

Then open:

```text
http://127.0.0.1:4173
```

Using the static server is the more reliable option for local testing.

## Customization

### Add or edit questions

Update the relevant level inside `assessmentQuestions` in `src/data/assessments.js`.
Each question can include an optional `weight` (default `1`) to make specific prompts count more toward the category score.

Example shape:

```js
{
  id: "int-js-1",
  category: "javascript",
  weight: 2,
  prompt: "What is the main difference between Array.forEach() and Array.map()?",
  options: [
    { label: "forEach always mutates the array but map never does", score: 0 },
    { label: "map returns a new array, while forEach is mainly for side effects", score: 1 }
  ]
}
```

### Add or change an assessment level

1. Add a level entry in `assessmentLevels` in `app.js`.
2. Add that level's questions in `assessmentQuestions`.
3. Optionally update intro copy in `index.html` if the track count changes.

### Add a new skill category

1. Add the category to `categories` in `app.js`.
2. Add questions that reference that category key.
3. Add recommendation entries for that category.
4. Update the landing-page copy in `index.html` if needed.

### Change the recommendation content

Update the `recommendations` object in `app.js`.

### Restyle the interface

Edit `styles.css`.

The easiest place to start is the CSS variables at the top of the file.

## What I’d Improve Next

If this moved beyond MVP, the next improvements would be:

- expand the saved assessment history view with comparisons over time
- refine weighted scoring with partial-credit options and tuned weights
- allow different quiz tracks for different learner goals
- explain why each weak category was flagged
- generate downloadable or shareable result summaries
- add facilitator or instructor views

## Accessibility and UX Notes

The current build includes:

- semantic layout structure
- responsive design
- visible progress feedback
- clear answer selection states
- a restart path for retaking the assessment

The next accessibility improvements would be:

- stronger keyboard support for quiz interaction
- focus management between screens
- deeper screen-reader testing

## Verification

Verified so far:

- `app.js` passes `node --check`
- files are wired together correctly
- the app supports demo-mode rendering for quick result checks

Still worth testing manually in a full browser:

- full intro -> quiz -> results flow
- restart behavior
- mobile layout behavior
- external resource links

## Portfolio Framing

This project is a good example of building a focused product MVP with a clear user outcome. It combines interface work, application state, structured content modeling, and logic-driven recommendations in a small codebase that is easy to review.

If you are presenting this in a portfolio, useful points to call out are:

- how the feature scope was intentionally constrained
- how the quiz content and recommendations were designed to be data-driven
- how the results screen turns raw answers into actionable guidance
- how the implementation stays readable by avoiding unnecessary framework complexity

## License

This project is licensed under the MIT License. See `LICENSE` for details.
