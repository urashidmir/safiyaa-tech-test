"use client";
import Link from "next/link";

type NameFormProps = {
  winner: string | null;
  submitted: boolean;
  playerName: string;
  onNameChange: (value: string) => void;
  onSubmit: () => void;
};

export default function NameForm({
  winner,
  submitted,
  playerName,
  onNameChange,
  onSubmit,
}: NameFormProps) {
  if (!winner) return null;

  if (submitted) {
    return (
      <div className="text-green-700 text-lg font-semibold mt-4 text-center">
        Score saved!{" "}
        <Link
          href="/leaderboard"
          className="underline text-blue-600 hover:text-blue-800 transition"
        >
          Visit the leaderboard
        </Link>{" "}
        to view results.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <div className="text-lg font-semibold">Enter Name for Leaderboard</div>

      <input
        type="text"
        value={playerName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Player name"
        className="border p-2 rounded w-48 text-center"
      />

      <button
        onClick={onSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Submit Score
      </button>
    </div>
  );
}
