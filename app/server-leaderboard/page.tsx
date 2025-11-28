import { getLeaderboard, insertScore } from "@/lib/queries";
import { revalidatePath } from "next/cache";


export async function addScore(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString().trim();
  const result = formData.get("result")?.toString().trim();

  if (!name || !result) return;

  await insertScore(name, result);
  revalidatePath("/server-leaderboard");
}

export default async function Page() {
  const rows = await getLeaderboard();

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold tracking-wide text-slate-800">
        Server Actions Leaderboard
      </h1>

      <div className="mt-8 w-full max-w-md bg-white shadow-md rounded-lg border border-slate-300">
        <div className="grid grid-cols-3 font-bold text-slate-700 text-lg border-b p-3 bg-slate-100">
          <div>#</div>
          <div>Name</div>
          <div>Result</div>
        </div>

        {rows.length === 0 && (
          <div className="text-center text-slate-500 py-6">
            No results yet
          </div>
        )}

        {rows.map(
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


      <form
        action={addScore}
        className="mt-8 flex flex-col gap-4 w-full max-w-md bg-white shadow-sm rounded-lg border border-slate-300 p-4"
      >
        <h2 className="font-bold text-lg text-slate-700 text-center">
          Add Score (Server Action)
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Player name"
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          name="result"
          placeholder="Result (e.g., X wins)"
          className="border p-2 rounded w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Score
        </button>
      </form>
    </div>
  );
}
