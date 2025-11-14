-- Renommer l'ancienne table
ALTER TABLE posts RENAME TO posts_old;

-- Recréer la table sans "title"
CREATE TABLE posts (
    post_id TEXT PRIMARY KEY,
    user_id TEXT,
    pub_date DATETIME,
    content TEXT,
    image TEXT,
    privacy TEXT,
    post_like INTEGER,
    post_dislike INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

-- Copier les données depuis l'ancienne table (toutes sauf "title")
INSERT INTO posts (post_id, user_id, pub_date, content, image, privacy, post_like, post_dislike)
SELECT post_id, user_id, pub_date, content, image, privacy, post_like, post_dislike
FROM posts_old;

-- Supprimer l'ancienne table
DROP TABLE posts_old;