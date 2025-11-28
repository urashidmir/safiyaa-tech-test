import { db } from "./db";

export async function getLeaderboard() {
  return db.all(
    `SELECT id, name, result, createdAt
     FROM leaderboard
     ORDER BY id DESC`
  );
}


export async function insertScore(name: string, result: string) {
  return db.run(
    `INSERT INTO leaderboard (name, result)
     VALUES (?, ?)`,
    name,
    result
  );
}
