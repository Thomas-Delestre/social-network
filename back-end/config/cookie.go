package config

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"github.com/gofrs/uuid"
)

const time_layout = "2006-01-02 15:04"

func (u User) SetupConnCookie() (cookie http.Cookie) {
	_uuid, _ := uuid.NewV4()

	db := OpenDB()
	defer db.Close()

	var st string = `UPDATE users SET cookie = ?, cookie_life_time = ? WHERE email = ?`
	req, err := db.Prepare(st)
	if err != nil {
		fmt.Println(err)
		return
	}
	_expirationdate := time.Now().Add(time.Hour * 24)
	req.Exec(_uuid, _expirationdate.Format(time_layout), u.Email)
	cookie = http.Cookie{
		Name:     "user",
		Value:    _uuid.String(),
		Expires:  _expirationdate,
		Path:     "/",   // ← indispensable si tu veux qu’il soit dispo partout
		HttpOnly: true,  // sécurité, empêche accès JS
		Secure:   false, // mettre true en HTTPS
	}
	return cookie
}

func (u User) ValidateSession(sessionToken string) (userID string, valid bool) {
	db := OpenDB()
	defer db.Close()

	var dbUserID string
	var cookieLifeTime time.Time

	st := `SELECT user_id, cookie_life_time FROM users WHERE cookie = ?`

	err := db.QueryRow(st, sessionToken).Scan(&dbUserID, &cookieLifeTime)
	if err != nil {
		if err == sql.ErrNoRows {
			return "", false
		}
		fmt.Println("Erreur lors de la validation de la session :", err)
		return "", false
	}

	if cookieLifeTime.IsZero() || time.Now().After(cookieLifeTime) {
		return "", false
	}

	return dbUserID, true
}

func (u User) Logout(userId string) error {
	db := OpenDB()
	defer db.Close()

	st := `UPDATE users SET cookie = NULL, cookie_life_time = NULL WHERE user_id = ?`
	stmt, err := db.Prepare(st)
	if err != nil {
		return err
	}
	defer stmt.Close()

	res, err := stmt.Exec(userId)
	if err != nil {
		return err
	}

	rows, _ := res.RowsAffected()
	if rows == 0 {
		fmt.Println("⚠️ Aucun utilisateur trouvé pour ce user_id")
	}
	return nil
}
