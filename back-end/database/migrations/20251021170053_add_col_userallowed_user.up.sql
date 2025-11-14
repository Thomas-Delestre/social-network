CREATE TABLE user_allowed (
	id TEXTPRIMARY KEY,
	post_id UUID NOT NULL,
    user_id UUID NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (post_id) REFERENCES posts(id)
);