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

const tools = [
  {
    type: "function",
    function: {
      name: "ReadFile",
      description: "Reads the content of a file given its path",
      parameters: {
        type: "object",
        properties: {
          file_path: {
            type: "string",
            description: "The path to the file to be read",
          },
        },
        required: ["file_path"],
      },
    },
  }
] 


const messages :Array <{
  role: "user" | "assistant" | "system",
  content?: string,
  tool_calls?: string
}> = [{
  role : "user",
  content : prompt
}]

while (true ){
  const response  = await client.chat.completions.create({
    model: "anthropic/claude-haiku-4.5",
    messages: messages,
    tools : tools,
  });

  if (!response.choices || response.choices.length === 0) {
    throw new Error("No response from the model");
  }

  const choice = response.choices[0];
  const message = choice.message;

messages.push({
      role: "assistant",
      content: message.content,
      ...(message.tool_calls ? { tool_calls: message.tool_calls } : {}),
    });

     if (message.tool_calls && message.tool_calls.length > 0) {
      for (const toolCall of message.tool_calls) {
        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        if (functionName === "Read") {
          const fileContent = fs.readFileSync(args.file_path, "utf-8");
          messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: fileContent,
          });
        }
      }
      continue;
    }

    if (message.content) {
      console.log(message.content);
      break;
    }

  };

}



  /// ---------------Stage 2 implementation ----------------
  // now we need to check if the model has called any tool or not 
  // if the model has called any tool then we need to execute that tool and pass the result back to the model and get the final response from the model
  // const toolCalls= response.choices[0].message.tool_calls
 
  // if (toolCalls && toolCalls.length > 0) {
  //   // now we need to extract the funciton name and the arguments from the tool call and execute the function and get the result

  //       if (toolCalls[0].type === "function" && toolCalls[0].function.name === "ReadFile") {
  //   const FunctionArgs = JSON.parse(toolCalls[0].function.arguments);
  //   const filePath = FunctionArgs.file_path;
  //   const fileContent = await ReadFile(filePath);
  //   // process.stdout.write(filePath);
  //   process.stdout.write(fileContent);
  // }
  // }
  // else {
  //   console.log(response.choices[0].message.content);
  // }


  // // You can use print statements as follows for debugging, they'll be visible when running tests.
  // console.error("Logs from your program will appear here!");

  // TODO: Uncomment the lines below to pass the first stage
  // console.log(response.choices[0].message.content);
}

main();
