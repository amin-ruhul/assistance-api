"use client";

export default function Home() {
  async function fetchInfoData() {
    try {
      const res = await fetch("/data/info.txt");
      const text = await res.text();
      console.log(text);
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
