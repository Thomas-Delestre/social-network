package config

import (
	"database/sql"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func (u User) Register() {
	// Commandes pour enregistrer dans la db
	db := OpenDB()
	defer db.Close()
	var st string = `INSERT INTO users(user_id, first_name, last_name, birthdate, email, password, profil_picture, about_me, private) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
	req, err := db.Prepare(st)
	if err != nil {
		fmt.Println(err)
		return
	}

	req.Exec(u.Id, u.Firstname, u.Lastname, u.Birthdate, u.Email, u.Password, u.ProfilPicture, u.AboutMe, u.Private)
}

func (u User) Authentificate() bool {
	db := OpenDB()
	defer db.Close()

	var hashedPassword string
	query := `SELECT password FROM users WHERE email = ?`
	err := db.QueryRow(query, u.Email).Scan(&hashedPassword)
	if err != nil {
		if err == sql.ErrNoRows {
			return false
		}
		fmt.Println("Erreur DB:", err)
		return false
	}

	// Vérification bcrypt
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(u.Password))
	if err != nil {
		return false
	}

	return true
}

func (u User) Delete() {
	db := OpenDB()
	defer db.Close()
	var st string = `DELETE FROM users WHERE user_id = ?`
	req, err := db.Prepare(st)
	if err != nil {
		fmt.Println(err)
		return
	}
	req.Exec(u.Id)
}

func (u User) CheckUserExists() bool {

	db := OpenDB()
	defer db.Close()

	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM users WHERE email = ?", u.Email).Scan(&count)
	if err != nil {
		fmt.Println("Erreur CheckUserExists:", err)
		return false
	}
	return count > 0
}

func (u User) GetUserData(userID string) (userData User) {
	db := OpenDB()
	defer db.Close()

	var st string = `SELECT user_id, first_name, last_name, birthdate, email, profil_picture, about_me, private FROM users WHERE user_id = ?`
	err := db.QueryRow(st, userID).Scan(&userData.Id, &userData.Firstname, &userData.Lastname, &userData.Birthdate, &userData.Email, &userData.ProfilPicture, &userData.AboutMe, &userData.Private)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("Aucun utilisateur trouvé avec cet ID")
			return userData
		}
		fmt.Println("Erreur lors de la récupération des données utilisateur :", err)
		return userData
	}
	return userData
}

func (u User) GetUserFriends(userID string) (friendsIDs []string) {

	friendsIDs = []string{}
	db := OpenDB()
	defer db.Close()

	var st string = `SELECT user_1, user_2 FROM relationship WHERE are_friend = ? AND (user_1 = ? OR user_2 = ?)`
	rows, err := db.Query(st, true, userID, userID)
	if err != nil {
		fmt.Println("Erreur lors de la récupération des amis :", err)
		return friendsIDs
	}
	defer rows.Close()

	for rows.Next() {
		var user1, user2 string
		if err := rows.Scan(&user1, &user2); err != nil {
			fmt.Println("Erreur lors du scan des amis :", err)
			continue
		}
		if user1 == userID {
			friendsIDs = append(friendsIDs, user2)
		} else {
			friendsIDs = append(friendsIDs, user1)
		}
	}
	return friendsIDs
}
