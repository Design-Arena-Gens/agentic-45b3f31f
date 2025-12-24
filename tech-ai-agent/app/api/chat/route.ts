import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const techKnowledgeBase = {
  react: [
    "React is a JavaScript library for building user interfaces. Key concepts include components, props, state, and hooks.",
    "React Hooks like useState, useEffect, and useContext allow you to use state and lifecycle features in functional components.",
    "React uses a virtual DOM to efficiently update the UI by comparing changes and only updating what's necessary."
  ],
  api: [
    "REST API best practices: Use proper HTTP methods (GET, POST, PUT, DELETE), implement versioning, use meaningful status codes.",
    "API design should be consistent, well-documented, secure with authentication, and include proper error handling.",
    "GraphQL is an alternative to REST that allows clients to request exactly the data they need."
  ],
  ml: [
    "Machine Learning involves training algorithms on data to make predictions or decisions without explicit programming.",
    "Types include supervised learning (labeled data), unsupervised learning (finding patterns), and reinforcement learning.",
    "Popular ML frameworks include TensorFlow, PyTorch, and scikit-learn for building and training models."
  ],
  database: [
    "Database optimization: Use indexes on frequently queried columns, avoid N+1 queries, use connection pooling.",
    "Query optimization: Select only needed columns, use JOINs efficiently, implement pagination for large datasets.",
    "Consider database normalization for data integrity and denormalization for read performance when needed."
  ],
  javascript: [
    "JavaScript is a versatile language used for web development, with features like async/await for asynchronous operations.",
    "Modern JavaScript (ES6+) includes arrow functions, destructuring, template literals, and modules.",
    "TypeScript adds static typing to JavaScript, helping catch errors during development."
  ],
  python: [
    "Python is known for its readability and simplicity, widely used in web development, data science, and automation.",
    "Key features: dynamic typing, extensive standard library, great for rapid prototyping.",
    "Popular frameworks: Django and Flask for web, NumPy and Pandas for data analysis."
  ],
  cloud: [
    "Cloud computing provides on-demand computing resources: AWS, Azure, and Google Cloud are major providers.",
    "Benefits include scalability, cost-efficiency, reliability, and global availability.",
    "Services include compute (VMs), storage (object storage), databases, and serverless functions."
  ],
  security: [
    "Security best practices: Use HTTPS, implement authentication and authorization, sanitize user inputs.",
    "Common vulnerabilities: SQL injection, XSS, CSRF, and insecure authentication.",
    "Use environment variables for secrets, implement rate limiting, and keep dependencies updated."
  ]
};

function generateResponse(messages: Message[]): string {
  const lastMessage = messages[messages.length - 1].content.toLowerCase();

  // Check for greetings
  if (/^(hi|hello|hey|greetings)/.test(lastMessage)) {
    return "Hello! I'm your Tech AI Agent. I can help you with questions about programming, software development, databases, APIs, machine learning, cloud computing, and more. What would you like to know?";
  }

  // Check for help requests
  if (/help|what can you do|capabilities/.test(lastMessage)) {
    return "I can assist you with:\n\n• Programming languages (JavaScript, Python, React, etc.)\n• API design and best practices\n• Database optimization\n• Machine learning concepts\n• Cloud computing\n• Security best practices\n• Software architecture\n• Development tools and frameworks\n\nJust ask me anything tech-related!";
  }

  // Match keywords to knowledge base
  for (const [topic, responses] of Object.entries(techKnowledgeBase)) {
    if (lastMessage.includes(topic)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Check for specific topics
  if (/hook|state|component/.test(lastMessage)) {
    return techKnowledgeBase.react[1];
  }

  if (/rest|endpoint|http/.test(lastMessage)) {
    return techKnowledgeBase.api[0];
  }

  if (/learn|train|model|ai/.test(lastMessage)) {
    return techKnowledgeBase.ml[0];
  }

  if (/query|sql|optimize|performance/.test(lastMessage)) {
    return techKnowledgeBase.database[1];
  }

  if (/async|promise|await/.test(lastMessage)) {
    return techKnowledgeBase.javascript[0];
  }

  if (/aws|azure|server|deploy/.test(lastMessage)) {
    return techKnowledgeBase.cloud[1];
  }

  if (/secure|auth|vulnerability/.test(lastMessage)) {
    return techKnowledgeBase.security[0];
  }

  // Default responses for various question types
  if (lastMessage.includes('how')) {
    return "Great question! The implementation depends on your specific use case and tech stack. Could you provide more context? For example, what framework or language are you using? I can then give you more specific guidance on best practices and implementation steps.";
  }

  if (lastMessage.includes('best practice')) {
    return "Best practices vary by context, but generally: write clean, maintainable code; use version control; implement testing; document your work; follow security guidelines; optimize for performance; and stay updated with current standards in your technology stack.";
  }

  if (lastMessage.includes('difference') || lastMessage.includes('vs')) {
    return "When comparing technologies, consider: performance characteristics, learning curve, community support, ecosystem maturity, specific use cases, scalability, and long-term maintenance. Each tool has trade-offs - the best choice depends on your project requirements.";
  }

  // Default response
  return "That's an interesting tech question! While I have knowledge about various programming topics, I'd be happy to help if you could be more specific. You can ask me about programming languages, frameworks, databases, APIs, machine learning, cloud computing, or specific development challenges you're facing.";
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const response = generateResponse(messages);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
