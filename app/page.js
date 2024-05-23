"use client";

import { createQuestionAndGetAns } from "@/config/langchain";
import { formatConvHistory } from "@/utils/formatConvHistory";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [convHistory, setConvHistory] = useState([]);
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
    setConvHistory((prevHis) => [...prevHis, query]);
    setQuery("");
    const res = await createQuestionAndGetAns({
      question: query,
      conv_history: formatConvHistory(convHistory),
    });
    setConvHistory((prevHis) => [...prevHis, res]);
  };

  return (
    <main className="h-screen bg-slate-800 flex items-center justify-center">
      {/* <p>Welcome</p>
      <button onClick={fetchInfoData}>Load</button> */}

      <div className="w-[500px] h-[600px] shadow-md bg-slate-300 rounded flex items-end p-3">
        <section className=" w-full">
          <section className="h-[500px] overflow-auto px-2 bg-slate-100 py-4 rounded">
            {convHistory.map((con, idx) => {
              if (idx % 2 == 0) {
                return (
                  <div className="flex justify-end mb-4" key={idx}>
                    <div className=" flex items-start space-x-2">
                      <p>{con}</p>
                      <div className="w-[30px] h-[30px] shrink-0 flex items-center border  justify-center rounded-full bg-slate-600 text-slate-300">
                        <p>Y</p>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div className="mb-4" key={idx}>
                  <div className=" flex items-start space-x-2">
                    <div className="w-[30px] h-[30px] shrink-0 flex items-center border  justify-center rounded-full bg-slate-600 text-slate-300">
                      <p>B</p>
                    </div>
                    <p>{con}</p>
                  </div>
                </div>
              );
            })}
          </section>

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
