package config

import (
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
		Name:    "sessionID",
		Value:   _uuid.String(),
		Expires: _expirationdate,
	}
	return
}
