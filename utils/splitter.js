import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const splitText = async (textList) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
  });

  const output = await splitter.createDocuments(textList);

  return output;
};
