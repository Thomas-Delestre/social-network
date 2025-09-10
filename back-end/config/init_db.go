package config

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/golang-migrate/migrate"
	"github.com/golang-migrate/migrate/database/sqlite3"
	_ "github.com/golang-migrate/migrate/source/file"
	_ "github.com/golang-migrate/migrate/v4" // ✅ Ajoutez cette ligne !
	_ "github.com/mattn/go-sqlite3"
)

func InitDB() {
	db := OpenDB()
	CheckMigrations(db)
	defer db.Close()
}

func OpenDB() (DB *sql.DB) {
	DB, err := sql.Open("sqlite3", "/home/student/Documents/Zone01/github_prod/social-network/back-end/data.db")
	println("Ouverture DB - Ok")
	if err != nil {
		print(err)
		log.Fatal("Can't open the database")
	}
	return DB
}

func CheckMigrations(db *sql.DB) {

	driver_sqlite, err := sqlite3.WithInstance(db, &sqlite3.Config{})
	if err != nil {
		log.Fatal(err)
	}
	migration, err := migrate.NewWithDatabaseInstance(
		"file://./config/migrations", // Le chemin est maintenant correct
		"sqlite3",
		driver_sqlite,
	)
	if err != nil {
		log.Fatal(err)
	}

	if err = migration.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatal(err)
	}

	fmt.Println("Migrations - OK")
}
