package main

import (
	"fmt"
	"social-net/config"
)

func main() {
	fmt.Println("Starting application...")
	config.Init_db()
}
