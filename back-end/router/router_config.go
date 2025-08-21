package router

import (
	"net/http"
	"os"

	"github.com/gorilla/mux" // Importez gorilla/mux
)

func SetupRouter() *mux.Router {
	router := mux.NewRouter()

	dir, _ := os.Getwd()
	fs := http.FileServer(http.Dir(dir))
	bFs := http.FileServer(http.Dir(dir + "/rsc/build/"))

	// Servir les fichiers statiques avec PathPrefix et StripPrefix
	router.PathPrefix("/rsc/").Handler(http.StripPrefix("/rsc/", fs))
	router.PathPrefix("/_app/").Handler(http.StripPrefix("/_app/", bFs))

	GetRoutes(router)
	PostRoutes(router)
	AuthRoutes(router)

	return router
}
