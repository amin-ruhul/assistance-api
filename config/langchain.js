import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { retriever } from "@/utils/retriever";
import { combineDocuments } from "@/utils/combineDocuments";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";

export async function createQuestionAndGetAns({ question, conv_history }) {
  const llm = new ChatOpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
  });
  const stringParser = new StringOutputParser();

  const standaloneQuestionTemplate = `Given some conversation history (if any) and a question, convert the question to a standalone question. 
conversation history: {conv_history}
question: {question} 
standalone question:`;

  const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
    standaloneQuestionTemplate
  );

  const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question about Scrimba based on the context provided and the conversation history. Try to find the answer in the context. If the answer is not given in the context, find the answer in the conversation history if possible. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." And direct the questioner to email ruhul@gmail.com. Don't try to make up an answer. Always speak as if you were chatting to a friend.
  context: {context}
  conversation history: {conv_history}
  question: {question}
  answer: `;

  const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

  const standaloneChain = standaloneQuestionPrompt.pipe(llm).pipe(stringParser);
  const retrieverChain = RunnableSequence.from([
    (prevResult) => prevResult.standalone_question,
    retriever,
    combineDocuments,
  ]);

  const answerChain = answerPrompt.pipe(llm).pipe(stringParser);

  const chain = RunnableSequence.from([
    {
      standalone_question: standaloneChain,
      original_input: new RunnablePassthrough(),
    },
    {
      context: retrieverChain,
      question: ({ original_input }) => original_input.question,
      conv_history: ({ original_input }) => original_input.conv_history,
    },
    answerChain,
  ]);

  // const standaloneQuestionChain = standaloneQuestionPrompt
  //   .pipe(llm)
  //   .pipe(stringParser)
  //   .pipe(retriever)
  //   .pipe(combineDocuments);

  // const response = await standaloneQuestionChain.invoke({
  //   question:
  //     "What are the technical requirements for running Scrimba? I only have a very old laptop which is not that powerful.",
  // });

  const response = await chain.invoke({
    question,
    conv_history,
  });

  return response;
}
