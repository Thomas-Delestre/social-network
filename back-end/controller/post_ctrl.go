package controller

import (
	"fmt"
	"log"
	"net/http"
	"socialnet/config"
	"socialnet/middleware"
)

func HandleNewPost(w http.ResponseWriter, r *http.Request) {

	fmt.Println("- enter handleNewPost")
	var _post config.Post
	// Gestion de la méthode
	if r.Method != http.MethodPost {
		log.Printf("Mauvaise méthode ! Une méthode POST est attendue, et non : %s", r.Method)
		http.Error(w, "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}
	// Parsing du formData multi type
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		log.Println("Erreur lors du parsing du formulaire multipart:", err)
		http.Error(w, "Erreur lors de la lecture du formulaire", http.StatusBadRequest)
		return
	}
	// récup intégrale du formulaire
	_post.UserId = r.FormValue("user_id")
	_post.Content = r.FormValue("content")
	_post.Visibility = r.FormValue("visibility")
	allowedUsers := r.Form["allowed_users[]"]
	_post.AllowedUsers = allowedUsers

	fmt.Println("- post struct :", _post)
	if ok, field := middleware.CheckInjection(&_post); ok {
		log.Printf("❌ Injection détectée dans le champ : %s", field)
		middleware.SendJsonFeedback(w, "error", "Warning : Une tentative d'injection a été détectée dans le formulaire de création de post !", http.StatusBadRequest)
		return
	}
	file, handler, err := r.FormFile("Image")

	if err != nil {
		if err == http.ErrMissingFile {
			log.Println("Aucun fichier 'Image' n'a été envoyé dans ce Post.")
		} else {
			log.Println("Erreur lors de la récupération du fichier :", err)
			http.Error(w, "Erreur serveur lors de la lecture du fichier", http.StatusInternalServerError)
			return
		}
	} else {
		print("img downloaded : ", file, handler)
		//img_name := service.ImageUploader(file, handler, w)
		//_post.Image = img_name
	}
	_post.NewPost()
	middleware.SendJsonFeedback(w, "success", "Post created successfully!", http.StatusOK)
}
