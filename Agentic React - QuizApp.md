Agentic React - QuizApp
FSL Version: V2.0.0
Guidelines
You must record yourself completing the challenge and share a public Google Drive link.
Record your entire screen (with system clock visible)
Start recording after the environment and agent setup
Maximum duration: 60 minutes (going over may affect evaluation)
The recording must be one continuous take — no pauses, edits, or interruptions
Do not use external resources (e.g., StackOverflow, blogs). Official documentation is allowed
Explain your thinking and decisions as you work
Useful:
Example recording: React Challenge
Technologies
This project will be built using the Node-React ecosystem libraries@A
React
Node
AI coding tools (e.g., Claude Code, GitHub Copilot, Codex, or similar)
Any LLM (e.g., Claude, ChatGPT, or self-hosted models)
AI Agentic Expectations
You must use AI as the primary developer.
Use AI to design the architecture and generate most of the code
Iterate through prompting rather than manual coding
Create agent-like workflows where possible
Use this prompt as your first message when starting your project. Interaction logs must be included in the submitted zip file.
We evaluate how effectively you guide AI—not how much code you write manually. Most of the implementation (≈80%+) should be AI-generated.
The Coding Challenge
The AI Development Quiz App is an educational product designed to help users test and reinforce their understanding of AI software development concepts such as agent design, prompt engineering, and workflow automation. The goal is to build a small but realistic quiz platform that feels like a complete product — something that could be extended, improved, or scaled in future iterations.
Quiz Platform
Help users learn and test their knowledge of AI software development concepts
Provide a smooth and engaging quiz-taking experience
Record user progress and results over time
Support easy expansion with new quizzes or question sets
Demonstrate best practices in product structure, persistence, and user flow
User Flow
User arrives at quiz selection
User selects a quiz category
Quiz begins with first question
User selects an answer
System shows correct/incorrect with explanation
User proceeds to next question
After final question, results are displayed
User can review answers or retake quiz
Core Features
Home & Navigation
A clear landing page explaining what the app is and what users can do
A list of available quiz categories (e.g., Agent Fundamentals, Prompt Engineering, Model Selection)
Option to select and start a quiz immediately
Simple navigation allowing users to move between home, quiz, and results views
Quiz Experience
Each quiz consists of multiple questions (at least 5)
Questions are multiple choice, with one correct answer
After answering, users immediately see whether they were correct and can read an explanation
A progress indicator (e.g., "Question 3 of 10") keeps the user oriented
A "Retake Quiz" button allows users to start over
Scoring & Results
Display total correct answers and percentage score upon quiz completion
Show performance feedback (e.g., "Excellent," "Keep practicing," "Needs review")
Store past scores and attempt history
Allow users to review previous quizzes and answers
Persistence & Data
Quiz content and user progress are stored in a database
Quizzes can be easily updated or expanded without code changes
User scores and attempt history persist across sessions
User Engagement
Optional username or profile creation to track results
Simple dashboard to show progress over time and quizzes completed
Motivational messages or visual feedback after each quiz
Content Expansion
Ability to add new quiz categories and questions without major refactors
Placeholder for future "Create Your Own Quiz" functionality
Optional / Stretch Features
Leaderboard showcasing top performers
Daily or weekly challenge quiz
Randomized question order for replayability
A "Learn Mode" where users see explanations before answering
Backend
Mock API
Can be a simple object like const questions = [];
You can access the quiz data template in the following JSON
Usage Example:
A junior developer learning about AI:
User opens the quiz app and sees three available categories
User selects "Agent Fundamentals" to test their knowledge
The quiz shows Question 1 with four multiple-choice options
User selects an answer and immediately sees the result
User reads the explanation to reinforce understanding
User continues through all 5 questions
At the end, User scores 4/5 (80%) and sees: "Good job! You're getting there!"
User reviews missed questions and can retake the quiz
Acceptance Criteria
Build a clear and intuitive quiz UI with frontend components
Manage quiz state (progress, scoring, persistence via localStorage)
Use a mock API to fetch quiz data
Allow users to start, finish, and retake quizzes
Add form validation and user feedback
Handle errors and edge cases
Apply basic, consistent styling (CSS or framework)
Submit a zip file of your project:
Remove unnecessary folders (e.g. node_modules, vendor, venv, .gradle, build)
Include all required files (e.g., .chat-history)