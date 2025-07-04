package router

import (
	"fmt"
	"net/http"
)

func AuthRoutes() {
	handlers_map := map[string]func(http.ResponseWriter, *http.Request){
		// "/login":    handleLogin,
		// "/logout":   handleLogout,
		// "/register": handleRegister,
	}

	for i, k := range handlers_map {
		fmt.Println(i)
		http.HandleFunc(i, k)
	}
}
