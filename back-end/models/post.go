package models

import (
	"fmt"
	"socialnet/database"
)

func (p Post) NewPost() {
	fmt.Println("New Post sql...\n")
	db := database.OpenDB()
	defer db.Close()
	var st string = `INSERT INTO posts(post_id, user_id, content, pub_date, image, privacy) VALUES (?, ?, ?, ?, ?, ?)`
	req, err := db.Prepare(st)
	if err != nil {
		fmt.Println("Post NewPost Prepare error :", err)
		return
	}
	req.Exec(p.Id, p.UserId, p.Content, p.Date, p.Image, p.Visibility)
	if p.Visibility == "almost_private" {
		for _, allowedUserId := range p.AllowedUsers {
			var st2 string = `INSERT INTO user_allowed(post_id, allowed_user_id) VALUES (?, ?)`
			req2, err := db.Prepare(st2)
			if err != nil {
				fmt.Println("Post NewPost Prepare allowed users error :", err)
				return
			}
			req2.Exec(p.UserId, allowedUserId)
		}
	} else if p.Visibility == "private" {
		var _user User
		friends := _user.GetUserFriends(p.UserId)
		for _, friendId := range friends {
			var st3 string = `INSERT INTO post_allowed_users(post_id, allowed_user_id) VALUES (?, ?)`
			req3, err := db.Prepare(st3)
			if err != nil {
				fmt.Println("Post NewPost Prepare friends error :", err)
				return
			}
			req3.Exec(p.Id, friendId)
		}
	}
}
