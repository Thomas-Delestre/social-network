package router

import (
	"fmt"
	"net/http"
	"socialnet/controllers"

	"github.com/gorilla/mux"
)

func PostRoutes(router *mux.Router) {
	handlers_map := map[string]func(http.ResponseWriter, *http.Request){

		"/newpost": controllers.HandleNewPost,
		// "/like/":           handleLike,
		// "/dislike/":        handleDislike,
		// "/newcomment/":     handleNewComment,
		// "/likecomment/":    handleLikeComment,
		// "/dislikecomment/": handleDislikeComment,
		"/register": controllers.HandleRegister,
	}

	for i, k := range handlers_map {
		fmt.Println(i)
		router.HandleFunc(i, k)
	}
}
