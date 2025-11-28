export default async function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/leaderboard`, {
    cache: "no-store",
  });

  const leaderboardData = await response.json();

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold tracking-wide text-slate-800">
        Leaderboard
      </h1>

      <div className="mt-8 w-full max-w-md bg-white shadow-md rounded-lg border border-slate-300">
        <div className="grid grid-cols-3 font-bold text-slate-700 text-lg border-b p-3 bg-slate-100">
          <div>#</div>
          <div>Name</div>
          <div>Result</div>
        </div>

        {leaderboardData.length === 0 && (
          <div className="text-center text-slate-500 py-6">
            No results yet
          </div>
        )}

        {leaderboardData.map(
          (
            entry: { id: number; name: string; result: string },
            idx: number
          ) => (
            <div
              key={entry.id}
              className={`grid grid-cols-3 p-3 text-slate-800 ${
                idx % 2 === 0 ? "bg-slate-50" : "bg-white"
              }`}
            >
              <div>{idx + 1}</div>
              <div className="uppercase font-semibold">{entry.name}</div>
              <div>{entry.result}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
