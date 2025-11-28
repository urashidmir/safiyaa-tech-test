"use client";

type BoardProps = {
  board: string[];
  size: number;
  onMove: (index: number) => void;
};

export default function Board({ board, size, onMove }: BoardProps) {
  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${size}, 60px)`,
        gridTemplateRows: `repeat(${size}, 60px)`,
      }}
    >
      {board.map((cell, idx) => (
        <button
          key={idx}
          onClick={() => onMove(idx)}
          className="w-[60px] h-[60px] border border-slate-400 flex items-center
                     justify-center text-2xl font-bold hover:bg-slate-100 transition"
        >
          {cell}
        </button>
      ))}
    </div>
  );
}
