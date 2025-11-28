"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [size, setSize] = useState(3);
  const router = useRouter();

  return (
    <div className="flex mt-10">
      <div className="flex flex-col items-center gap-10 flex-1">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wide text-slate-800">
          Tic Tac Toe
        </h1>

        <div className="flex flex-col items-center gap-4">
          <label className="font-semibold text-slate-700">
            Board Size (3–15)
          </label>

          <input
            type="number"
            min={3}
            max={15}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="border p-2 w-24 text-center rounded"
          />

          <button
            onClick={() => router.push(`/game?size=${size}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
