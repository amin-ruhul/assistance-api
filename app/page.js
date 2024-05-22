"use client";

import { createStandaloneQuestion } from "@/config/langchain";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  // async function fetchInfoData() {
  //   try {
  //     const res = await fetch("/data/info.txt");
  //     const text = await res.text();
  //     await storeData(text);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleUserQuery = async (e) => {
    e.preventDefault();
    console.log(query);
    const res = await createStandaloneQuestion();
    console.log(res);
  };

  return (
    <main className="h-screen bg-slate-800 flex items-center justify-center">
      {/* <p>Welcome</p>
      <button onClick={fetchInfoData}>Load</button> */}

      <div className="w-[500px] h-[600px] shadow-md bg-slate-300 rounded flex items-end p-3">
        <section className=" w-full">
          <section></section>

          <form
            className="border flex w-full rounded-md"
            onSubmit={handleUserQuery}
          >
            <input
              className=" py-2 px-2 outline-none flex-1 rounded-l-md"
              placeholder="Enter query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="bg-slate-800 px-3 py-1 rounded-r-md">🕊️</button>
          </form>
        </section>
      </div>
    </main>
  );
}
