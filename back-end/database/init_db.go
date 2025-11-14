package database

import (
	"database/sql"
	"fmt"
	"log"
	"path/filepath"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/sqlite3"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/mattn/go-sqlite3"
)

const (
	DBPath         = "/home/student/Documents/Zone01/github_prod/social-network/back-end/data.db"
	MigrationsPath = "./database/migrations"
)

// InitDB initialise la base de données et applique les migrations
func InitDB() *sql.DB {
	db := OpenDB()
	CheckMigrations(db)
	return db // Retourne la DB pour l'utiliser ailleurs
}

// OpenDB ouvre la connexion à la base de données
func OpenDB() *sql.DB {
	db, err := sql.Open("sqlite3", DBPath)
	if err != nil {
		log.Fatalf("Erreur ouverture DB: %v", err)
	}

	// Vérifier que la connexion fonctionne
	if err = db.Ping(); err != nil {
		log.Fatalf("Erreur connexion DB: %v", err)
	}

	fmt.Println("✅ Ouverture DB - OK")
	return db
}

// CheckMigrations vérifie et applique les migrations
func CheckMigrations(db *sql.DB) {
	// Créer le driver SQLite
	driver, err := sqlite3.WithInstance(db, &sqlite3.Config{})
	if err != nil {
		log.Fatalf("Erreur création driver: %v", err)
	}

	// Obtenir le chemin absolu des migrations
	absPath, err := filepath.Abs(MigrationsPath)
	if err != nil {
		log.Fatalf("Erreur chemin migrations: %v", err)
	}

	// Créer l'instance de migration
	m, err := migrate.NewWithDatabaseInstance(
		fmt.Sprintf("file://%s", absPath),
		"sqlite3",
		driver,
	)
	if err != nil {
		log.Fatalf("Erreur initialisation migrations: %v", err)
	}

	// Vérifier si une migration est dirty
	version, dirty, err := m.Version()
	if err != nil && err != migrate.ErrNilVersion {
		log.Fatalf("Erreur récupération version: %v", err)
	}

	if dirty {
		log.Printf("⚠️  Migration %d est DIRTY, tentative de correction...", version)
		// Forcer la version pour nettoyer l'état dirty
		if err := m.Force(int(version)); err != nil {
			log.Fatalf("Erreur correction migration dirty: %v", err)
		}
		fmt.Println("✅ Migration dirty corrigée")
	}

	// Appliquer les migrations
	if err = m.Up(); err != nil {
		if err == migrate.ErrNoChange {
			fmt.Println("✅ Migrations déjà à jour")
		} else {
			log.Fatalf("Erreur application migrations: %v", err)
		}
	} else {
		fmt.Println("✅ Migrations appliquées avec succès")
	}

	// Afficher la version actuelle
	currentVersion, _, _ := m.Version()
	fmt.Printf("📊 Version actuelle de la DB: %d\n", currentVersion)
}
