package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"socialnet/config"
	"socialnet/middleware"
	"socialnet/router"

	"github.com/joho/godotenv"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	fmt.Println("Starting application...")

	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found, using system env : ", err)
	} else {
		log.Println("Fichier .env chargé.")
	}
	config.InitDB()

	router := router.SetupRouter()

	port := os.Getenv("PORT")
	fmt.Println("Server running at http://localhost:" + port)

	handler := middleware.CORSMiddleware()(router)

	if err := http.ListenAndServe(":"+port, handler); err != nil {
		log.Fatal("Erreur au démarrage du serveur :", err)
	}

}
