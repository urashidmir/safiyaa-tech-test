import { NextResponse } from 'next/server';

const leaderboardData = [
  { id: 1, name: 'Alice', score: 1500 },
  { id: 2, name: 'Bob', score: 1200 },
  { id: 3, name: 'Charlie', score: 1000 },
];

// GET /api/leaderboard
export async function GET() {
  return NextResponse.json({
    success: true,
    data: leaderboardData,
  });
}

// POST /api/leaderboard

