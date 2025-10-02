package test

import (
	"socialnet/config"
	"socialnet/service"
	"testing"

	"golang.org/x/crypto/bcrypt"
)

func TestCheckUserExists(t *testing.T) {
	email := "nico@nico.com"
	var _user config.User
	exists := _user.CheckUserExists()
	if !exists {
		t.Errorf("CheckUserExists(%s) = false, attendu true", email)
	}
}

func TestHashPassword(t *testing.T) {
	password := "azerty"
	hashedPassword, err := service.HashPassword(password)
	if err != nil {
		t.Fatalf("Erreur inattendue lors du hachage du mot de passe : %v", err)
	}
	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		t.Errorf("La vérification du mot de passe a échoué. Le hash généré ne correspond pas au mot de passe original. Erreur : %v", err)
	}
}

// func TestAdd(t *testing.T) {
// 	test := true
// 	if !test {
// 		t.Errorf("Le test a échoué. Attendu 'true', mais obtenu 'false'")
// 	}
// }
