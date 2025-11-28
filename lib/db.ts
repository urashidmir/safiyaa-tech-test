import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const db = await open({
  filename: "./leaderboard.db",
  driver: sqlite3.Database,
});


await db.exec(`
  CREATE TABLE IF NOT EXISTS leaderboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    result TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);
