package router

import (
	"net/http"
	"os"

	"github.com/gorilla/mux" // Importez gorilla/mux
)

func SetupRouter() *mux.Router {
	router := mux.NewRouter()

	dir, _ := os.Getwd()
	print(dir)
	fs := http.FileServer(http.Dir(dir))
	bFs := http.FileServer(http.Dir(dir + "/rsc/build/"))
	uploadsDir := http.Dir(dir + "/uploads")

	// Servir les fichiers statiques avec PathPrefix et StripPrefix
	router.PathPrefix("/rsc/").Handler(http.StripPrefix("/rsc/", fs))
	router.PathPrefix("/_app/").Handler(http.StripPrefix("/_app/", bFs))
	router.PathPrefix("/uploads/").Handler(http.StripPrefix("/uploads/", http.FileServer(uploadsDir)))

	GetRoutes(router)
	PostRoutes(router)
	AuthRoutes(router)

	return router
}
