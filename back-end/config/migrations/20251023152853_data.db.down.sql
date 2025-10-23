DROP TABLE IF EXISTS relationship;

CREATE TABLE follow_relations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    follower_id TEXT NOT NULL,
    followed_id TEXT NOT NULL,
    UNIQUE(follower_id, followed_id),
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES users(id) ON DELETE CASCADE
);