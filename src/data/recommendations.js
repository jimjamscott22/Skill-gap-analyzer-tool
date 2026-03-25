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
