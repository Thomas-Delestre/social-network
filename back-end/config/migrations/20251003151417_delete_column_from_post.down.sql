-- Renommer la table actuelle
ALTER TABLE posts RENAME TO posts_old;

-- Recréer la table avec "title"
CREATE TABLE posts (
    post_id TEXT PRIMARY KEY,
    user_id TEXT,
    title VARCHAR(50),
    pub_date DATETIME,
    content TEXT,
    image TEXT,
    privacy TEXT,
    post_like INTEGER,
    post_dislike INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

-- Copier les données (ajout de NULL pour la colonne manquante "title")
INSERT INTO posts (post_id, user_id, title, pub_date, content, image, privacy, post_like, post_dislike)
SELECT post_id, user_id, NULL as title, pub_date, content, image, privacy, post_like, post_dislike
FROM posts_old;

-- Supprimer l'ancienne table
DROP TABLE posts_old;