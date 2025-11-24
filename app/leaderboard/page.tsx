export default async function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/leaderboard`, {
    cache: "no-store",
  });
  const leaderboardData = await response.json();

  console.log(leaderboardData);

  return (
    <div className="flex-col mt-10">
      <div className="flex flex-col items-center flex-1">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wide text-slate-800">
          Leaderboard
        </h1>
      </div>
      <div className="flex flex-col items-center gap-4 flex-1 mt-10">
        <div className="font-bold text-l">1. You</div>
        <div className="font-bold text-l">2. Not you</div>
        <div className="font-bold text-l">3. Also not you</div>
      </div>
    </div>
  );
}
