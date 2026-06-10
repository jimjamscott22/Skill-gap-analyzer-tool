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
