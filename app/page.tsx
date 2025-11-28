"use client";

import { useState } from "react";
import Game from "@/components/Game";

export default function Page() {
  const [size, setSize] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center mt-12">

      {/* If no size selected → show size selector */}
      {!size && (
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold tracking-wide text-slate-800">
            Tic Tac Toe
          </h1>

          <label className="font-semibold text-slate-700">
            Choose Board Size (3–15)
          </label>

          <input
            type="number"
            min={3}
            max={15}
            placeholder="3"
            className="border p-2 w-24 text-center rounded"
            onChange={(e) => {
              const v = Number(e.target.value);
              if (v >= 3 && v <= 15) setSize(v);
            }}
          />

          <button
            onClick={() => size && setSize(size)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!size}
          >
            Start Game
          </button>
        </div>
      )}

      {/* If size selected → render game */}
      {size && (
        <Game
          size={size}
          onReset={() => setSize(null)} // back to selector
        />
      )}
    </div>
  );
}
