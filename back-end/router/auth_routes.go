package router

import (
	"fmt"
	"net/http"
	"socialnet/controllers"

	"github.com/gorilla/mux"
)

func AuthRoutes(router *mux.Router) {
	handlers_map := map[string]func(http.ResponseWriter, *http.Request){
		"/login":           controllers.HandleLogin,
		"/checkConnection": controllers.HandleCheckConnection,
		"/logout":          controllers.HandleLogout,
	}

	for i, k := range handlers_map {
		fmt.Println(i)
		router.HandleFunc(i, k)
	}
}
