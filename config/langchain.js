import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

export async function createStandaloneQuestion() {
  const llm = new ChatOpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
  });

  const standaloneQuestionTemplate =
    "Given a question, convert it to a standalone question. question: {question} standalone question:";

  const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
    standaloneQuestionTemplate
  );

  const standaloneQuestionChain = standaloneQuestionPrompt.pipe(llm);

  const response = await standaloneQuestionChain.invoke({
    question:
      "What are the technical requirements for running Scrimba? I only have a very old laptop which is not that powerful.",
  });

  return response;
}
