package config

type User struct {
	Id              string
	Firstname       string
	Lastname        string
	Birthdate       string
	Email           string
	Password        string
	ConfirmPassword string
	ProfilPicture   string
	AboutMe         string
	Private         bool
	Cookie          string
	CookieLifeTime  string
}
