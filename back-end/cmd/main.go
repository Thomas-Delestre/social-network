package main

import (
	"fmt"
	"social-net/config"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	fmt.Println("Starting application...")
	config.InitDB()
}
