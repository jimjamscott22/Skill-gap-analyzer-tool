# Goal-Guided Assessment Design

## Summary

Improve the Skill Gap Analyzer by adding career-goal onboarding before the current level selection. The first version supports three goals: Frontend Developer, React Developer, and Full-Stack Developer. The selected goal personalizes the setup, adds a short goal-specific question block, and reframes the results into a clearer readiness story.

The goal is to add product depth while preserving the current static vanilla JavaScript architecture and the existing category-based scoring model.

## Product Flow

The intro experience becomes a guided setup:

1. The user chooses a career goal: Frontend Developer, React Developer, or Full-Stack Developer.
2. The user chooses the existing assessment level: beginner, intermediate, or advanced.
3. The quiz runs the existing core question set for the selected level.
4. The quiz includes an additional goal-specific block of 2 questions for the selected goal and level.
5. The results page keeps the current category breakdown and recommendations, then adds a goal-readiness interpretation based on the selected career goal.

If goal-specific questions are missing for a goal and level pair, the quiz should still run with the core question set.

## Data Model

Add a `careerGoals` data object keyed by goal id. Each goal should include:

- `label`
- `description`
- `priorityCategories`
- setup helper copy
- results framing copy
- 2-3 goal-specific next actions

Add a `goalQuestions` data object keyed by goal id and then assessment level. Each goal and level pair should provide 2 additional questions. Goal questions should use the same shape as existing assessment questions: `id`, `category`, `prompt`, optional `weight`, and scored `options`.

The selected career goal should be part of app state and saved in each history entry.

## Scoring

Scoring should continue to use the existing category-based scoring engine. Core questions and goal-specific questions should be combined into one ordered question list before evaluation.

Goal-specific questions should contribute to normal category totals. No separate readiness score is required for the first version. The goal-readiness panel should interpret existing category results through the selected goal's priority categories.

## UI And State

The intro screen should stay inside the existing app card and become a two-step setup:

- Career goal cards with label, description, and priority-skill tags.
- Level cards using the current beginner, intermediate, and advanced options.

The quiz screen should show context pills for both selected goal and selected level. When goal-specific questions begin, the UI should show a clear "Goal Focus" label so the user understands why those prompts are different.

The results screen should add a Goal Readiness panel. It should show:

- selected career goal
- short readiness interpretation
- priority categories for that goal
- 2-3 next actions

Existing score breakdowns, weakest-area cards, recommendation resources, restart behavior, history count, and demo modes should remain available.

## Error Handling

If localStorage cannot be read or written, the app should continue to work using the existing fallback behavior and console warning.

If a goal or level from query params is invalid, the app should fall back to valid defaults.

If goal-specific questions are unavailable, the assessment should use only the core questions.

## Demo Modes

Existing demo modes should continue to work:

- `?demo=perfect`
- `?demo=mixed`
- `?demo=weak`

Demo URLs may optionally accept `goal=frontend|react|fullstack` and `level=beginner|intermediate|advanced`. Invalid values should fall back to defaults.

## Testing And Verification

Verification should focus on the highest-risk behavior:

- core and goal-specific questions combine in the expected order
- category scoring still includes all answered questions
- selected career goal is saved in assessment history
- invalid goal or level params fall back safely
- missing goal-specific questions do not break the quiz
- demo modes still produce results
- browser smoke checks cover intro setup, quiz progression, and results

Because this is a static vanilla JavaScript app, a first implementation can use focused browser smoke checks and direct utility tests if a lightweight no-build test script is added.

## Out Of Scope

This design does not add accounts, cloud persistence, external APIs, a dashboard, export/share flows, or a separate readiness score. Those can build on the saved goal metadata later.
