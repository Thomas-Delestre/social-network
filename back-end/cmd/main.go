package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"social-net/config"
	"social-net/router"

	"github.com/joho/godotenv"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	fmt.Println("Starting application...")

	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using system env.")
	}

	config.InitDB()

	router.SetupRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Println("Server running at http://localhost:" + port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("Erreur au démarrage du serveur :", err)
	}
}
