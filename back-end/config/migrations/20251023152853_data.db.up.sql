DROP TABLE IF EXISTS follow_relations;

CREATE TABLE relationship (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_1 TEXT NOT NULL,
    user_2 TEXT NOT NULL,
    are_friend BOOLEAN DEFAULT 0,
    UNIQUE(user_1, user_2),
    FOREIGN KEY (user_1) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_2) REFERENCES users(id) ON DELETE CASCADE
);