package router

import (
	"fmt"
	"net/http"
	"socialnet/controller"

	"github.com/gorilla/mux"
)

func AuthRoutes(router *mux.Router) {
	handlers_map := map[string]func(http.ResponseWriter, *http.Request){
		"/login":           controller.HandleLogin,
		"/checkConnection": controller.HandleCheckConnection,
		"/logout":          controller.HandleLogout,
	}

	for i, k := range handlers_map {
		fmt.Println(i)
		router.HandleFunc(i, k)
	}
}
