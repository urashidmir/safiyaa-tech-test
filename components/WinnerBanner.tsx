type WinnerBannerProps = {
  winner: string | null;
  currentPlayer: "X" | "O";
};

export default function WinnerBanner({ winner, currentPlayer }: WinnerBannerProps) {
  if (!winner) {
    return (
      <div className="font-semibold text-lg">
        Current Player: <span className="text-blue-600">{currentPlayer}</span>
      </div>
    );
  }

  return (
    <div className="font-bold text-xl text-green-600">
      {winner === "draw" ? "It's a draw!" : `Winner: ${winner}`}
    </div>
  );
}
