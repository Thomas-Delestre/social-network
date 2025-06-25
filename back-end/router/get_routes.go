package router

import (
	"fmt"
	"net/http"
)

func GetRoutes() {
	handlers_map := map[string]func(http.ResponseWriter, *http.Request){
		// "/profile": handleProfile,
		// "/post/":   handlePost,
		// "/posts/":  handlePostList,
	}

	for i, k := range handlers_map {
		fmt.Println(i)
		http.HandleFunc(i, k)
	}
}
