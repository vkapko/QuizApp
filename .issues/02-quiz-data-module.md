# Issue #2: Quiz data module (15 questions, 3 categories)

## What to build

Create the mock API data module with all AI-generated quiz content. This is a plain JS import — no HTTP calls. The shape must match the contract the rest of the app depends on so that all downstream slices can use real data from the start.

## Acceptance criteria

- [ ] `src/api/quizData.js` exports a default array of 3 category objects
- [ ] Each category object has the shape `{ id, category, questions: [...] }`
- [ ] Each question has the shape `{ text, options: [string × 4], correctIndex: number, explanation: string }`
- [ ] Categories covered: Agent Fundamentals, Prompt Engineering, Model Selection
- [ ] Each category contains exactly 5 questions
- [ ] All `correctIndex` values are in range `[0, 3]`
- [ ] All questions and explanations are substantively accurate to AI development concepts
- [ ] A `getCategoryById(id)` helper is exported and returns `undefined` for unknown ids

## Blocked by

- Issue #1 (project scaffold)
