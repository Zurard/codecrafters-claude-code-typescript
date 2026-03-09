import OpenAI from "openai";
import { ReadFile } from "./read";

async function main() {
  const [, , flag, prompt] = process.argv;
  const apiKey = process.env.OPENROUTER_API_KEY;
  const baseURL =
    process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1";

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }
  if (flag !== "-p" || !prompt) {
    throw new Error("error: -p flag is required");
  }

  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: baseURL,
  });

  const response = await client.chat.completions.create({
    model: "anthropic/claude-haiku-4.5",
    messages: [
      { 
      role: "user", 
      content: prompt,
       }
    ],
    // the llms have the tools  parameter which tell is what all tools it has access to and how to use them, so that it can call them when needed
    tools : [
      {
      "type": "function",
      //advertising the read file function to the model so that it can use it when needed
      "function" : {
        "name" : "ReadFile",
        "description": "Read and return the contents of the file",
        "parameters": {
          "type" : "object",
          "porperties" : {
            "file_path" :{ "type": "string"  , "description" : "the path to the file to read "},
            
        },
        "required" : ["file_path"]
      }
    }
  }
  ]
  
  });

  if (!response.choices || response.choices.length === 0) {
    throw new Error("no choices in response");
  }
 
  // now we need to check if the model has called any tool or not 
  // if the model has called any tool then we need to execute that tool and pass the result back to the model and get the final response from the model
  const toolCalls= response.choices[0].message.tool_calls
  if (!toolCalls || toolCalls.length === 0) {
   throw new Error("no tool calls in response");
  }

  // now we need to extract the funciton name and the arguments from the tool call and execute the function and get the result
  if ('function' in toolCalls[0] && toolCalls[0].function.name !== "ReadFile") {
    const FunctionArgs = JSON.parse(toolCalls[0].function.arguments);
    const filePath = FunctionArgs.file_path;
    const fileContent = await ReadFile(filePath);

    process.stdout.write(fileContent);
  }

  // You can use print statements as follows for debugging, they'll be visible when running tests.
  console.error("Logs from your program will appear here!");

  // TODO: Uncomment the lines below to pass the first stage
  console.log(response.choices[0].message.content);
}

main();
