const quizData = [
  {
    id: 'agent-fundamentals',
    category: 'Agent Fundamentals',
    questions: [
      {
        text: 'What is the primary role of a "tool" in an AI agent architecture?',
        options: [
          'To store the agent\'s memory between sessions',
          'To extend the agent\'s capabilities by letting it call external functions',
          'To define the agent\'s system prompt',
          'To limit the number of tokens the agent can generate',
        ],
        correctIndex: 1,
        explanation:
          'Tools (also called functions or actions) let an agent call external APIs, run code, search databases, or perform any operation outside the LLM itself, dramatically extending what it can do.',
      },
      {
        text: 'In a ReAct (Reason + Act) agent loop, what happens after the agent emits an "Action"?',
        options: [
          'The loop terminates and the final answer is returned',
          'The system prompt is reloaded',
          'The tool result (Observation) is appended to the context and the agent reasons again',
          'The user is prompted for confirmation',
        ],
        correctIndex: 2,
        explanation:
          'ReAct alternates Thought → Action → Observation. After the tool runs, its output (Observation) is fed back into the context so the model can reason about the result and decide on the next step.',
      },
      {
        text: 'Which memory type persists information across multiple agent sessions without any external database?',
        options: [
          'In-context (working) memory',
          'External vector store memory',
          'None — LLMs are stateless by default',
          'Episodic memory stored in a relational database',
        ],
        correctIndex: 2,
        explanation:
          'LLMs are stateless; they have no built-in persistence. In-context memory is lost when the conversation ends, and vector/relational stores are external systems. Persistence always requires an explicit storage mechanism.',
      },
      {
        text: 'What distinguishes a "multi-agent" system from a single agent with many tools?',
        options: [
          'Multi-agent systems cannot use tools',
          'Each agent in a multi-agent system can specialise, run in parallel, and maintain independent context',
          'Multi-agent systems always require a human in the loop',
          'Multi-agent systems are only useful for coding tasks',
        ],
        correctIndex: 1,
        explanation:
          'Multi-agent architectures allow specialised agents (planner, researcher, coder, critic) to work concurrently or sequentially, each with its own context window, tools, and responsibility — enabling parallelism and separation of concerns that a single agent cannot achieve.',
      },
      {
        text: 'Why is it important to include a "stopping condition" in an agentic loop?',
        options: [
          'To prevent the agent from using more than one tool per turn',
          'To avoid infinite loops or runaway token consumption when the agent cannot solve the task',
          'To force the agent to ask the user a question after every step',
          'To restrict the agent to a fixed number of unique tools',
        ],
        correctIndex: 1,
        explanation:
          'Without a stopping condition (max iterations, confidence threshold, or explicit "done" signal), an agent can loop indefinitely, consuming tokens and money. Stopping conditions are a critical reliability and cost-control mechanism.',
      },
    ],
  },
  {
    id: 'prompt-engineering',
    category: 'Prompt Engineering',
    questions: [
      {
        text: 'What does "few-shot prompting" mean?',
        options: [
          'Sending the model a very short system prompt',
          'Providing a small number of input-output examples inside the prompt to guide the model\'s behaviour',
          'Fine-tuning a model on a few hundred examples',
          'Using a temperature near zero to make outputs deterministic',
        ],
        correctIndex: 1,
        explanation:
          'Few-shot prompting embeds 2–10 worked examples directly in the prompt. The model infers the pattern and applies it to the new input without any weight updates — a form of in-context learning.',
      },
      {
        text: 'Which technique asks the model to explain its reasoning step-by-step before giving an answer?',
        options: [
          'Retrieval-Augmented Generation (RAG)',
          'Chain-of-Thought (CoT) prompting',
          'Constitutional AI',
          'Prefix tuning',
        ],
        correctIndex: 1,
        explanation:
          'Chain-of-Thought prompting (Wei et al., 2022) instructs the model to produce intermediate reasoning steps. This significantly improves accuracy on multi-step arithmetic, logic, and commonsense reasoning tasks.',
      },
      {
        text: 'What is the main risk of a "prompt injection" attack?',
        options: [
          'The model generates outputs that are too long',
          'Malicious content in untrusted input overrides the developer\'s system prompt and hijacks agent behaviour',
          'The model refuses to answer legitimate questions',
          'API latency increases due to oversized prompts',
        ],
        correctIndex: 1,
        explanation:
          'Prompt injection occurs when user-controlled or third-party content (e.g., a webpage the agent reads) contains instructions that override the developer\'s intended instructions, potentially causing data exfiltration, unauthorised actions, or policy violations.',
      },
      {
        text: 'When should you prefer a system prompt over a user-turn message for core instructions?',
        options: [
          'Never — the model treats them identically',
          'Only when using GPT-4',
          'When the instruction is a persistent persona, constraint, or policy that should apply for the entire conversation',
          'When the instruction is task-specific and only relevant for one response',
        ],
        correctIndex: 2,
        explanation:
          'System prompts set persistent context (role, tone, rules, tools) that applies across the whole conversation. User-turn messages are better for one-off, task-specific instructions. Mixing them properly improves model adherence.',
      },
      {
        text: 'What is "temperature" controlling in a language model\'s output?',
        options: [
          'The maximum number of tokens the model can generate',
          'The randomness (entropy) of the token sampling distribution',
          'How quickly the model streams tokens to the client',
          'The size of the model\'s context window',
        ],
        correctIndex: 1,
        explanation:
          'Temperature scales the logits before softmax. A higher temperature flattens the distribution (more random, creative outputs); a lower temperature sharpens it (more deterministic, focused outputs). Temperature = 0 makes sampling greedy.',
      },
    ],
  },
  {
    id: 'model-selection',
    category: 'Model Selection',
    questions: [
      {
        text: 'Which factor is MOST important when choosing a smaller model over a frontier model for production?',
        options: [
          'Smaller models always produce better code',
          'Lower latency and cost when the task is well-defined and quality is sufficient',
          'Smaller models have larger context windows',
          'Frontier models cannot be fine-tuned',
        ],
        correctIndex: 1,
        explanation:
          'Smaller models (e.g., Haiku, GPT-4o-mini) are faster and cheaper. When a task is narrow and well-defined (classification, extraction, simple Q&A), they often match frontier quality at a fraction of the cost and latency.',
      },
      {
        text: 'What is a primary advantage of using a model with a large context window (e.g., 200 K tokens)?',
        options: [
          'It eliminates the need for prompt engineering',
          'It allows entire codebases, documents, or conversation histories to be processed in a single pass',
          'It increases the model\'s reasoning ability on simple tasks',
          'It automatically reduces hallucination rates',
        ],
        correctIndex: 1,
        explanation:
          'Large context windows enable long-document summarisation, full-codebase analysis, and extended multi-turn conversations without chunking or retrieval workarounds — simplifying architecture significantly.',
      },
      {
        text: 'Why might you use Retrieval-Augmented Generation (RAG) instead of simply fine-tuning a model on your data?',
        options: [
          'RAG is always cheaper than fine-tuning',
          'RAG allows real-time access to up-to-date or proprietary knowledge without retraining',
          'Fine-tuned models cannot answer factual questions',
          'RAG models have no latency overhead',
        ],
        correctIndex: 1,
        explanation:
          'Fine-tuning bakes knowledge into weights at a point in time and requires retraining to update. RAG retrieves live documents at inference time, making it ideal for dynamic, proprietary, or frequently-updated knowledge bases.',
      },
      {
        text: 'What does it mean for a model to "hallucinate"?',
        options: [
          'The model refuses to answer sensitive questions',
          'The model generates confident, plausible-sounding but factually incorrect information',
          'The model produces outputs with very high temperature',
          'The model exceeds its context window limit',
        ],
        correctIndex: 1,
        explanation:
          'Hallucination refers to a model fabricating facts, citations, or details that sound authoritative but are incorrect. It is a key reliability concern in production AI systems and is mitigated with grounding techniques like RAG and citations.',
      },
      {
        text: 'When is fine-tuning the right choice over prompt engineering alone?',
        options: [
          'When you want to reduce model inference cost',
          'When consistent style, format, or domain adaptation is required and cannot be achieved reliably with prompting',
          'When the task changes frequently and the training data would become stale',
          'When the model already performs well on the task with zero-shot prompting',
        ],
        correctIndex: 1,
        explanation:
          'Fine-tuning excels when you need the model to consistently follow a specific output format, tone, or domain convention that is hard to enforce through prompts alone — especially across diverse inputs at scale.',
      },
    ],
  },
];

export const getCategoryById = (id) => quizData.find((cat) => cat.id === id);

export default quizData;
