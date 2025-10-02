package middleware

import (
	"encoding/json"
	"net/http"
)

func SendJsonFeedback(w http.ResponseWriter, key, message string, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]string{key: message})
}
