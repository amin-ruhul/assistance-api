import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createSupabaseClient } from "@/config/supabase";

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
});
const client = createSupabaseClient();

const vectorStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: "documents",
  queryName: "match_documents",
});

const retriever = vectorStore.asRetriever();

export { retriever };
