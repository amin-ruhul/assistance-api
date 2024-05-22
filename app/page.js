"use client";

import { splitText } from "@/utils/splitter";

export default function Home() {
  async function fetchInfoData() {
    try {
      const res = await fetch("/data/info.txt");
      const text = await res.text();
      const spitedText = await splitText([text]);
      console.log(spitedText);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <p>Welcome</p>
      <button onClick={fetchInfoData}>Load</button>
    </main>
  );
}
