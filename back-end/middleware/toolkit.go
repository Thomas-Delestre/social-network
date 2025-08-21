package middleware

import (
	"net/http"
	"reflect"
	"strings"

	"github.com/rs/cors"
)

func CORSMiddleware() func(http.Handler) http.Handler {
	return cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // adapte selon ton front
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	}).Handler
}

// Analyse tous les champs string d'une struct
func CheckInjection(s interface{}) (bool, string) {
	v := reflect.ValueOf(s)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}
	t := v.Type()

	for i := 0; i < v.NumField(); i++ {
		field := v.Field(i)
		fieldType := t.Field(i)

		// On ne vérifie que les champs de type string
		if field.Kind() == reflect.String {
			value := field.String()
			if SuspectPatternDetected(value) {
				return true, fieldType.Name
			}
		}
	}
	return false, ""
}

func SuspectPatternDetected(input string) bool {
	patterns := []string{
		"<script>",
		"DROP",
		"--",
		"\"",
		"SELECT",
		"OR 1=1",
		"UNION",
	}
	input = strings.ToLower(input)
	for _, p := range patterns {
		if strings.Contains(input, strings.ToLower(p)) {
			return true
		}
	}
	return false
}
