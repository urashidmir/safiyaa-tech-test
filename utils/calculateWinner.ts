export function calculateWinner(board: string[], size: number): string | null {
  const lines: number[][] = [];


  for (let r = 0; r < size; r++) {
    lines.push([...Array(size)].map((_, i) => r * size + i));
  }


  for (let c = 0; c < size; c++) {
    lines.push([...Array(size)].map((_, i) => i * size + c));
  }


  lines.push([...Array(size)].map((_, i) => i * size + i));
  lines.push([...Array(size)].map((_, i) => i * size + (size - 1 - i)));


  for (const line of lines) {
    const values = line.map((i) => board[i]);
    if (values.every((v) => v === "X")) return "X";
    if (values.every((v) => v === "O")) return "O";
  }

  if (board.every((cell) => cell !== "")) return "draw";

  return null;
}
