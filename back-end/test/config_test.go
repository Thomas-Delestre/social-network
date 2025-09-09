package test

import (
	"socialnet/config"
	"socialnet/service"
	"testing"
)

func TestRegister(t *testing.T) {

	var _user config.User

	_user.Id = "test-id-123"
	_user.Firstname = "Test"
	_user.Lastname = "User"
	_user.Birthdate = "1990-01-01"
	_user.Email = "1996-03-03"
	_user.Password = "ahashedandsecurepassword"
	_user.AboutMe = "Just a test user."
	_user.Private = false
	_user.ProfilPicture = "default.png"

	_user.Register()

	var user_exist bool = service.CheckUserExists(_user.Email)
	if !user_exist {
		t.Error("Échec de l'enregistrement de l'utilisateur ou de la vérification de son existence.", user_exist)
	} else {
		_user.Delete()
	}
}

func TestSetupConnCookie(t *testing.T) {
	var _user config.User
	_user.Id = "test-id-123"
	_user.Firstname = "Test"
	_user.Lastname = "User"
	_user.Birthdate = "1990-01-01"
	_user.Email = "1996-03-03"
	_user.Password, _ = service.HashPassword("azerty")
	_user.AboutMe = "Just a test user."
	_user.Private = false
	_user.ProfilPicture = "default.png"

	_user.Register()
	cookie := _user.SetupConnCookie()
	if cookie.Name != "sessionID" || cookie.Value == "" {
		t.Error("Le cookie n'a pas été correctement généré.")
	}
}

func TestDelete(t *testing.T) {
	var _user config.User

	_user.Id = "test-id-123"
	_user.Firstname = "Test"
	_user.Lastname = "User"
	_user.Birthdate = "1990-01-01"
	_user.Email = "1996-03-03"
	_user.Password = "ahashedandsecurepassword"
	_user.AboutMe = "Just a test user."
	_user.Private = false
	_user.ProfilPicture = "default.png"

	_user.Register()
	var user_exist bool = service.CheckUserExists(_user.Email)
	if !user_exist {
		t.Error("Échec de l'enregistrement de l'utilisateur ou de la vérification de son existence.", user_exist)
	} else {
		_user.Delete()
		user_exist = service.CheckUserExists(_user.Email)
		if user_exist {
			t.Error("Échec de la suppression de l'utilisateur.", user_exist)
		}
	}
}
