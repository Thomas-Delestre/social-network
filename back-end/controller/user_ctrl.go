package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"socialnet/config"
	"socialnet/middleware"
	"socialnet/service"
	"strconv"

	"github.com/google/uuid"
)

func HandleRegister(w http.ResponseWriter, r *http.Request) {

	fmt.Println("- enter handleRegister")
	var _user config.User
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
	_user.Id = uuid.New().String()
	_user.Firstname = r.FormValue("first_name")
	_user.Lastname = r.FormValue("last_name")
	_user.Birthdate = r.FormValue("birthdate")
	_user.Email = r.FormValue("email")
	_user.Password = r.FormValue("password")
	_user.ConfirmPassword = r.FormValue("confirm_password")
	_user.AboutMe = r.FormValue("about-me")
	_user.Private, _ = strconv.ParseBool(r.FormValue("privacy"))

	//Check Injection SQL+
	if ok, field := middleware.CheckInjection(&_user); ok {
		log.Printf("❌ Injection détectée dans le champ : %s", field)
		middleware.SendJsonFeedback(w, "error", "Warning : Une tentative d'injection a été détectée dans le formulaire d'inscription !", http.StatusBadRequest)
		return
	}
	// Password comparaison
	if _user.Password != _user.ConfirmPassword {
		middleware.SendJsonFeedback(w, "error", "Warning : Password and Comfirm Password are not the same !", http.StatusBadRequest)
		return
	} else {
		_user.Password, _ = service.HashPassword(r.FormValue("password"))
	}
	//Check si l'utilisateur n'existe pas déjà par email
	var user_exist bool = _user.CheckUserExists()
	if user_exist {
		middleware.SendJsonFeedback(w, "error", "Warning : Cette adresse mail est déjà utilisée !", http.StatusBadRequest)
		return
	}
	// seulement si tout est validé on télécharge l'image et on concerve sont chemin d'accès.
	file, handler, err := r.FormFile("profilPicture")

	if err != nil {
		if err == http.ErrMissingFile {
			log.Println("Aucun fichier 'profilePicture' n'a été envoyé.")
		} else {
			log.Println("Erreur lors de la récupération du fichier :", err)
			http.Error(w, "Erreur serveur lors de la lecture du fichier", http.StatusInternalServerError)
			return
		}
	} else {
		upload_path := service.ImageUploader(file, handler, w)
		_user.ProfilPicture = upload_path
	}

	fmt.Printf("📦 Structure : %+v\n", _user)
	_user.Register()
	cookie := _user.SetupConnCookie()
	http.SetCookie(w, &cookie)
	fmt.Println("NORMALEMENT LE COOKIE EST OK !")
	middleware.SendJsonFeedback(w, "message", "Vous êtes enregistré et connecté !", http.StatusOK)
}

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Enter in Login controller")

	if r.Method != http.MethodPost {
		fmt.Printf("Mauvaise méthode ! Une méthode POST est attendue, et non : %s\n", r.Method)
		middleware.SendJsonFeedback(w, "error", "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	var _user config.User
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&_user)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	fmt.Println("valeur de mon email : ", _user.Email)

	// Vérification injection
	if ok, field := middleware.CheckInjection(&_user); ok {
		log.Printf("❌ Injection détectée dans le champ : %s", field)
		middleware.SendJsonFeedback(w, "error", "Warning : Une tentative d'injection a été détectée !", http.StatusBadRequest)
		return
	}

	// Vérification existence en DB
	user_exist := _user.CheckUserExists()
	fmt.Println("check si user exist")
	if !user_exist {
		fmt.Println("user existe pas")
		middleware.SendJsonFeedback(w, "error", "Warning : Aucun compte lié à cette adresse n'a été retrouvé", http.StatusBadRequest)
		return
	}

	// Vérification email + password hash
	fmt.Println("check des log du user")
	login := _user.Authentificate()
	if !login {
		middleware.SendJsonFeedback(w, "error", "Warning : Email ou mot de passe incorrect !", http.StatusUnauthorized)
		return
	}

	// Connexion réussie → setup cookie
	cookie := _user.SetupConnCookie()
	http.SetCookie(w, &cookie)
	fmt.Println("NORMALEMENT LE COOKIE EST OK !")
	middleware.SendJsonFeedback(w, "message", "Vous êtes connecté !", http.StatusOK)
}

func HandleCheckConnection(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Enter in CheckConnection controller")

	var _user config.User

	if r.Method != http.MethodGet {
		fmt.Printf("Mauvaise méthode ! Une méthode GET est attendue, et non : %s\n", r.Method)
		middleware.SendJsonFeedback(w, "error", "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	cookie, err := r.Cookie("user")
	if err != nil {
		if err == http.ErrNoCookie {
			middleware.SendJsonFeedback(w, "error", "Utilisateur non connecté", http.StatusUnauthorized)
			return
		}
		middleware.SendJsonFeedback(w, "error", "Erreur serveur", http.StatusBadRequest)
		return
	}

	sessionToken := cookie.Value
	userId, valid := _user.ValidateSession(sessionToken)
	if !valid {
		middleware.SendJsonFeedback(w, "error", "Session invalide", http.StatusUnauthorized)
		return
	}

	// Si la session est valide, renvoyer les informations de l'utilisateur
	userData := _user.GetUserData(userId)
	if userData.Id == "" {
		middleware.SendJsonFeedback(w, "error", "Utilisateur non trouvé", http.StatusNotFound)
		return
	} else {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"userData": userData,
		})
		return
	}
}

func HandleLogout(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Enter in Logout controller")

	if r.Method != http.MethodPost {
		middleware.SendJsonFeedback(w, "error", "Méthode non autorisée", http.StatusMethodNotAllowed)
		return
	}

	cookie, err := r.Cookie("user")
	if err != nil {
		if err == http.ErrNoCookie {
			middleware.SendJsonFeedback(w, "error", "Utilisateur non connecté", http.StatusUnauthorized)
			return
		}
		middleware.SendJsonFeedback(w, "error", "Erreur serveur", http.StatusBadRequest)
		return
	}

	sessionToken := cookie.Value
	var u config.User
	userId, valid := u.ValidateSession(sessionToken)
	if !valid {
		middleware.SendJsonFeedback(w, "error", "Session invalide", http.StatusUnauthorized)
		return
	}

	// Nettoyage en DB
	if err := u.Logout(userId); err != nil {
		middleware.SendJsonFeedback(w, "error", "Erreur lors de la déconnexion", http.StatusInternalServerError)
		return
	}

	// Supprimer le cookie côté client
	expiredCookie := http.Cookie{
		Name:     "user",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Secure:   false, // ⚠️ mettre true en prod avec HTTPS
		SameSite: http.SameSiteLaxMode,
		MaxAge:   -1,
	}
	http.SetCookie(w, &expiredCookie)

	middleware.SendJsonFeedback(w, "message", "Déconnexion réussie", http.StatusOK)
}
