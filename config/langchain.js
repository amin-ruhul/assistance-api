import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { retriever } from "@/utils/retriever";

export async function createStandaloneQuestion() {
  const llm = new ChatOpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
  });
  const stringParser = new StringOutputParser();

  const standaloneQuestionTemplate =
    "Given a question, convert it to a standalone question. question: {question} standalone question:";

  const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
    standaloneQuestionTemplate
  );

  const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question about Scrimba based on the context provided. Try to find the answer in the context. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." And direct the questioner to email ruhulinfo50@gmail.com Don't try to make up an answer. Always speak as if you were chatting to a friend.
  context: {context}
  question: {question}
  answer:
  `;

  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

  function combineDocuments(docs) {
    return docs.map((doc) => doc.pageContent).join("\n\n");
  }

  const standaloneQuestionChain = standaloneQuestionPrompt
    .pipe(llm)
    .pipe(stringParser)
    .pipe(retriever)
    .pipe(combineDocuments);

  const response = await standaloneQuestionChain.invoke({
    question:
      "What are the technical requirements for running Scrimba? I only have a very old laptop which is not that powerful.",
  });

  return response;
}
