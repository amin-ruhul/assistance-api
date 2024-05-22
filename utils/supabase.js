import { createSupabaseClient } from "@/config/supabase";
import { splitText } from "./splitter";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";

export async function storeData(data) {
  const text = await splitText([data]);
  const client = createSupabaseClient();

  try {
    const res = await SupabaseVectorStore.fromDocuments(
      text,
      new OpenAIEmbeddings({
        openAIApiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
      }),
      {
        client,
        tableName: "documents",
      }
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
