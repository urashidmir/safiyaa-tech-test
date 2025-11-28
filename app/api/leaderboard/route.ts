import { NextResponse } from "next/server";
import { getLeaderboard, insertScore } from "@/lib/queries";

export async function GET() {
  const rows = await getLeaderboard();
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  try {
    const { name, result } = await req.json();

    if (!name || !result) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await insertScore(name, result);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to insert leaderboard entry" },
      { status: 500 }
    );
  }
}
