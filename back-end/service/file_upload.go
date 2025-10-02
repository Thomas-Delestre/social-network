package service

import (
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"os"
)

func ImageUploader(file multipart.File, handler *multipart.FileHeader, w http.ResponseWriter) string {
	defer file.Close()
	log.Printf("Fichier reçu : %s, Taille : %d bytes", handler.Filename, handler.Size)

	// Crée le dossier de destination s'il n'existe pas
	if err := os.MkdirAll("/home/student/Documents/Zone01/github_prod/social-network/back-end/uploads", os.ModePerm); err != nil {
		log.Println("Erreur création dossier :", err)
		http.Error(w, "Erreur serveur", http.StatusInternalServerError)
	}

	// Crée le fichier de destination
	path := os.Getenv("UPLOAD_PATH") + handler.Filename
	dst, err := os.Create(path)
	if err != nil {
		log.Println("Erreur création fichier :", err)
		http.Error(w, "Erreur serveur", http.StatusInternalServerError)
	}
	defer dst.Close()

	if _, err = io.Copy(dst, file); err != nil {
		log.Println("Erreur sauvegarde fichier :", err)
		http.Error(w, "Erreur serveur", http.StatusInternalServerError)
	}
	log.Println("Fichier sauvegardé avec succès dans ./uploads/" + handler.Filename)
	return handler.Filename
}
