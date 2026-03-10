# AI-Powered Coding Assistant with Tool Use

An intelligent TypeScript-based coding assistant that leverages Claude AI's function calling capabilities to autonomously read files and provide smart code insights. This project demonstrates how to build sophisticated AI agents with tool integration.

## 🎯 Project Overview

This application showcases an **AI agent loop** where Claude AI can:
- Receive user prompts and code-related queries
- Autonomously decide when to invoke tools (like file reading)
- Execute those tools and process results
- Maintain conversation context across multiple tool calls
- Provide intelligent, context-aware responses

## 🚀 Key Features

✅ **LLM Integration** - Seamless integration with Claude AI via OpenRouter API  
✅ **Function Calling** - AI agents autonomously invoke tools when needed  
✅ **Multi-turn Conversations** - Agent loops that maintain context across multiple exchanges  
✅ **File Operations** - Safe file reading with dynamic path handling  
✅ **Error Handling** - Robust validation and error management  
✅ **TypeScript** - Type-safe implementation with full type checking  

## 💻 Tech Stack

- **Runtime**: TypeScript (Node.js)
- **LLM**: Claude Haiku 4.5 via OpenRouter API
- **API Client**: OpenAI SDK (OpenAI-compatible)
- **Environment**: TypeScript + Bun

## 🔄 How It Works

### Agent Loop Flow:
1. **User Input** → Send prompt to Claude with available tools
2. **AI Decision** → Claude decides if it needs to call a tool
3. **Tool Execution** → If needed, execute the tool (e.g., ReadFile)
4. **Context Addition** → Send results back to Claude
5. **Loop Continue** → Claude processes results and either:
   - Calls another tool, or
   - Provides final response
6. **Output** → Return final response to user

## 🛠️ Getting Started

### Prerequisites
- Node.js / Bun (1.3+)
- OpenRouter API Key (`OPENROUTER_API_KEY` environment variable)

### Installation
```bash
npm install
# or with bun
bun install
```

### Running the Program
```bash
./your_program.sh -p "Your prompt here"
```

### Example
```bash
./your_program.sh -p "What does the main.ts file do?"
```

The AI will automatically read the file and provide an analysis.

## 📚 Learning Outcomes

This project demonstrates:
- Building AI agents with **autonomous tool calling**
- Implementing **agentic loops** for multi-step reasoning
- API integration with **OpenAI-compatible endpoints**
- Proper error handling and validation
- TypeScript best practices for AI applications

## 📝 Architecture

```
app/
├── main.ts      # Core agent logic and API integration
├── read.ts      # File reading tool implementation
```

## 🎓 Key Concepts Implemented

- **Tool Definition** - Describing tools to the LLM
- **Function Calling** - AI autonomously invoking tools
- **Agent Loop** - Iterative reasoning with context
- **Message History** - Maintaining conversation state
- **Error Handling** - Graceful failure management

---

**Built with focus on clean code, proper typing, and AI/LLM best practices.**
