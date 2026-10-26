-- IT WORLD JERSEY Live Sale chat
-- Run this migration against the Cloudflare D1 database bound as LIVE_CHAT_DB.
CREATE TABLE IF NOT EXISTS live_chat_sessions (
  token TEXT PRIMARY KEY,
  name TEXT NOT NULL CHECK(length(name) BETWEEN 2 AND 50),
  phone TEXT NOT NULL,
  is_banned INTEGER NOT NULL DEFAULT 0,
  ban_reason TEXT,
  banned_at TEXT,
  ip_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_live_chat_sessions_ip_created
  ON live_chat_sessions(ip_hash, created_at);
CREATE TABLE IF NOT EXISTS live_chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_token TEXT NOT NULL,
  name TEXT NOT NULL,
  message TEXT NOT NULL CHECK(length(message) BETWEEN 1 AND 500),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY(session_token) REFERENCES live_chat_sessions(token)
);
CREATE INDEX IF NOT EXISTS idx_live_chat_messages_created
  ON live_chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_live_chat_messages_session_created
  ON live_chat_messages(session_token, created_at);
