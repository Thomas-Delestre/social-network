package router

import (
	"net/http"
	"os"
)

func SetupRouter() {

	dir, _ := os.Getwd()
	fs := http.FileServer(http.Dir(dir))
	bFs := http.FileServer(http.Dir(dir + "/rsc/build/"))
	http.Handle("/rsc/", fs)
	http.Handle("/_app/", bFs)
	// setup the directory of files
	GetRoutes()
	PostRoutes()
	AuthRoutes()
}
