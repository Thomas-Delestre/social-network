package service

import (
	"fmt"
	"socialnet/config"
)

func CheckUserExists(user_email string) bool {
	db := config.OpenDB()
	defer db.Close()

	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM users WHERE email = ?", user_email).Scan(&count)
	if err != nil {
		fmt.Println("Erreur CheckUserExists:", err)
		return false
	}
	return count > 0
}
