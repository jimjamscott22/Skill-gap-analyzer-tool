# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A static, zero-dependency web app that quizzes users on web development skills, scores them by category, and generates learning recommendations. No build step, no package manager, no framework.

## Running the App

**Option 1 — Direct browser open:**
```
open index.html
```

**Option 2 — Local static server (Node.js required):**
```bash
node tmp_static_server.js
# Serves at http://127.0.0.1:4173
```

**Demo modes** (append to URL for testing the results screen without completing the quiz):
- `?demo=perfect` — all correct answers
- `?demo=mixed` — alternating correct/incorrect
- `?demo=weak` — all incorrect

## Architecture

This is a single-page app with three screens managed by a central `render()` dispatcher in `app.js`. No routing library — just a `state.screen` value (`'intro' | 'quiz' | 'results'`) that determines which template gets cloned and mounted.

**Data flow:**
1. `QUESTIONS` array → rendered one at a time on the quiz screen
2. User answers stored in `state.answers` (keyed by question id)
3. `evaluateAssessment()` computes per-category scores from answers
4. `lookupRecommendation()` maps score ratios to beginner/intermediate/strong levels
5. Results screen renders scores + recommendations from `RECOMMENDATIONS` object

**Key data structures in `app.js`:**
- `CATEGORIES` — 5 skill areas (HTML/CSS, JavaScript, React/JSX, TypeScript, Debugging)
- `QUESTIONS` — 10 questions, each with `id`, `category`, `prompt`, `options[]` (each option has a `score` of 0 or 1)
- `RECOMMENDATIONS` — nested object: `category → level → { guidance, resources[] }`
- `state` — single global object with `screen`, `questionIndex`, `answers`, `results`

**Scoring:** Binary per answer. Score ratio `< 0.5` → beginner, `< 1.0` → intermediate, `= 1.0` → strong. The two weakest categories are surfaced as priority gaps.

**Templates:** `index.html` contains three `<template>` elements (`introTemplate`, `quizTemplate`, `resultsTemplate`). Each screen renderer clones the relevant template and populates it before mounting to `#app-content`.

## Extending the App

- **Add questions:** Append to `QUESTIONS` array in `app.js`. Each option must have a `score` (0 or 1).
- **Add a category:** Add to `CATEGORIES`, add questions referencing it, add entries to `RECOMMENDATIONS` for all three levels.
- **Change thresholds:** Edit `lookupRecommendation()` in `app.js`.

## Test Hooks

The app exposes two globals for automation/testing:
- `window.render_game_to_text()` — returns a text snapshot of current UI state
- `window.advanceTime()` — programmatic progression hook
