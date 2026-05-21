"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3001/health")
      .then((res) => {
        if (!res.ok) throw new Error("Backend response error");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => console.error("Could not reach backend:", err));
  }, []);

  return (
    <main style={{padding: 20}}>
      <h1>Frontend</h1>

      <h2>Backend Response:</h2>

      <pre>
        {data ? JSON.stringify(data, null, 2) : "Loading..."}
      </pre>
    </main>
  );
}
