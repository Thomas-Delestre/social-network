package router

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func GetRoutes(router *mux.Router) {
	handlers_map := map[string]func(http.ResponseWriter, *http.Request){
		// "/profile": handleProfile,
		// "/post/":   handlePost,
		// "/posts/":  handlePostList,
	}

	for i, k := range handlers_map {
		fmt.Println(i)
		router.HandleFunc(i, k)
	}
}
