package router

import (
	"fmt"
	"net/http"
)

func PostRoutes() {
	handlers_map := map[string]func(http.ResponseWriter, *http.Request){

		// "/newpost":         handleNewPost,
		// "/like/":           handleLike,
		// "/dislike/":        handleDislike,
		// "/newcomment/":     handleNewComment,
		// "/likecomment/":    handleLikeComment,
		// "/dislikecomment/": handleDislikeComment,
	}

	for i, k := range handlers_map {
		fmt.Println(i)
		http.HandleFunc(i, k)
	}
}
