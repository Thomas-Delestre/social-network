package config

import (
	"database/sql"
	"fmt"
	"log"
)

func InitDB() {
	db := OpenDB()
	CreateTables(db)
	defer db.Close()
}

func OpenDB() (DB *sql.DB) {
	DB, err := sql.Open("sqlite3", "./data.db")
	println("Ouverture DB - Ok")
	if err != nil {
		print(err)
		log.Fatal("Can't open the database")
	}
	return DB
}

func CreateTables(db *sql.DB) {

	var tables_list []string = []string{
		`
		CREATE TABLE IF NOT EXISTS users (
			user_id STRING PRIMARY KEY,
			first_name VARCHAR(50),
			last_name VARCHAR(50),
			birthdate DATETIME,
			email TEXT,
			password TEXT UNIQUE,
			profil_picture TEXT,
			about_me TEXT,
			private INTEGER,
			cookie TEXT,
			cookie_life_time DATETIME
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS posts (
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
		`,
		`
		CREATE TABLE IF NOT EXISTS comments (
			comment_id TEXT PRIMARY KEY,
			user_id TEXT,
			post_id TEXT,
			content TEXT,
			creation_date DATETIME,
			comment_like_count INTEGER,
			comment_dislike_count INTEGER,
			FOREIGN KEY(user_id) REFERENCES users(user_id),
			FOREIGN KEY(post_id) REFERENCES posts(post_id)
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS post_like_dislike (
			like_dislike_id TEXT,
			user_id TEXT,
			post_id TEXT,
			comment_id TEXT,
			like_status INTEGER,
			FOREIGN KEY(user_id) REFERENCES users(user_id),
			FOREIGN KEY(post_id) REFERENCES posts(post_id),
			FOREIGN KEY(comment_id) REFERENCES comments(comment_id)
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS follow_relation (
			follower_id TEXT,
			followed_id TEXT,
			FOREIGN KEY(follower_id) REFERENCES users(user_id),
			FOREIGN KEY(followed_id) REFERENCES users(user_id)

		);
		`,
		`
		CREATE TABLE IF NOT EXISTS messages (
			sender_id TEXT,
			receiver_id TEXT,
			content TEXT,
			date DATETIME,
			image TEXT,
			FOREIGN KEY(sender_id) REFERENCES users(user_id),
			FOREIGN KEY(receiver_id) REFERENCES users(user_id)
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS groups (
			group_id TEXT PRIMARY KEY,
			name VARCHAR(50),
			description TEXT,
			creation_date DATETIME
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS group_members (
			group_id TEXT,
			user_id TEXT,
			role VARCHAR(50),
			FOREIGN KEY(group_id) REFERENCES groups(group_id),
			FOREIGN KEY(user_id) REFERENCES users(user_id)
		);
		`,
		`CREATE TABLE IF NOT EXISTS events (
			event_id TEXT PRIMARY KEY,
			group_id TEXT,
			description TEXT,
			start_date DATETIME,
			end_date DATETIME,
			passed INTEGER
		);
		`,
		`
		CREATE TABLE IF NOT EXISTS event_participants (
			event_id TEXT,
			user_id TEXT,
			FOREIGN KEY(event_id) REFERENCES events(event_id),
			FOREIGN KEY(user_id) REFERENCES users(user_id)
		);
		`,
	}

	for index, table := range tables_list {

		fmt.Println("Table n°", index, " - OK")
		statement, err := db.Prepare(table)
		if err != nil {
			fmt.Println("Erreur d'execution de statement lors d'une création de table : ", err)
		}
		statement.Exec()
	}
}
