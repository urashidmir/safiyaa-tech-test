"use client";

import { useState, useEffect } from "react";

import Board from "@/components/Board";
import WinnerBanner from "@/components/WinnerBanner";
import NameForm from "@/components/NameForm";

import { initBoard } from "@/utils/initBoard";
import { calculateWinner } from "@/utils/calculateWinner";

type GameProps = {
  size: number;
  onReset: () => void; 
};

export default function Game({ size, onReset }: GameProps) {
  const [board, setBoard] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    setBoard(initBoard(size));
    setCurrentPlayer("X");
    setWinner(null);
    setPlayerName("");
    setSubmitted(false);
  }, [size]);


  function handleMove(index: number) {
    if (board[index] || winner) return;

    const updated = [...board];
    updated[index] = currentPlayer;

    const result = calculateWinner(updated, size);

    setBoard(updated);
    setCurrentPlayer((p) => (p === "X" ? "O" : "X"));

    if (result) setWinner(result);
  }

  function resetGame() {
    setBoard(initBoard(size));
    setCurrentPlayer("X");
    setWinner(null);
    setPlayerName("");
    setSubmitted(false);
  }

  async function submitScore() {
    if (!playerName.trim() || !winner) return;

    await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: playerName.trim(),
        result: winner === "draw" ? "Draw" : `${winner} wins`,
      }),
    });

    setSubmitted(true);
  }

  return (
    <div className="flex flex-col items-center mt-10 gap-6">
      <h2 className="text-3xl font-bold text-slate-800">
        Board Size: {size} × {size}
      </h2>

      <WinnerBanner winner={winner} currentPlayer={currentPlayer} />

      <Board board={board} size={size} onMove={handleMove} />

      <NameForm
        winner={winner}
        submitted={submitted}
        playerName={playerName}
        onNameChange={setPlayerName}
        onSubmit={submitScore}
      />

      <button
        onClick={resetGame}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Restart Game
      </button>

      <button
        onClick={onReset}
        className="mt-2 px-4 py-1 text-slate-600 underline hover:text-slate-800"
      >
        Change Board Size
      </button>
    </div>
  );
}
