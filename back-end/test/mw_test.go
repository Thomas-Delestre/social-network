package test

import (
	"socialnet/middleware"
	"testing"
)

func TestCheckInjection(t *testing.T) {
	// Structure de données utilisée pour les tests
	type TestData struct {
		Username    string
		Comment     string
		Age         int // Champ non-string pour vérifier qu'il est bien ignoré
		Description string
	}

	// Définition des cas de test
	testCases := []struct {
		name         string      // Nom du sous-test
		input        interface{} // Donnée à tester (struct ou pointeur)
		expectDetect bool        // Résultat attendu (bool)
		expectField  string      // Champ attendu si détection
	}{
		{
			name: "Données valides sans injection",
			input: TestData{
				Username:    "John Doe",
				Comment:     "Ceci est un commentaire tout à fait normal.",
				Age:         30,
				Description: "Un utilisateur.",
			},
			expectDetect: false,
			expectField:  "",
		},
		{
			name: "Injection SQL simple dans le premier champ",
			input: TestData{
				Username:    "admin' OR 1=1 --",
				Comment:     "commentaire normal",
				Age:         40,
				Description: "Un utilisateur.",
			},
			expectDetect: true,
			expectField:  "Username", // Doit détecter le pattern "--"
		},
		{
			name: "Injection XSS dans un autre champ",
			input: TestData{
				Username:    "UtilisateurLambda",
				Comment:     "mon site <script>alert('hack')</script>",
				Age:         25,
				Description: "RAS",
			},
			expectDetect: true,
			expectField:  "Comment",
		},
		{
			name: "Injection insensible à la casse",
			input: TestData{
				Username:    "testuser",
				Comment:     "Tentative de sElEcT * from users",
				Age:         22,
				Description: "",
			},
			expectDetect: true,
			expectField:  "Comment",
		},
		{
			name: "Pointeur vers une struct avec données valides",
			input: &TestData{
				Username:    "Jane Doe",
				Comment:     "Un autre commentaire valide.",
				Age:         28,
				Description: "Une utilisatrice.",
			},
			expectDetect: false,
			expectField:  "",
		},
		{
			name: "Pointeur vers une struct avec injection",
			input: &TestData{
				Username:    "baduser",
				Comment:     "commentaire",
				Age:         50,
				Description: "UNION SELECT password FROM users",
			},
			expectDetect: true,
			expectField:  "Description",
		},
		{
			name: "Struct sans champs de type string",
			input: struct {
				ID      int
				IsValid bool
			}{
				ID: 123, IsValid: true,
			},
			expectDetect: false,
			expectField:  "",
		},
	}

	// Boucle d'exécution des tests
	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			detected, fieldName := middleware.CheckInjection(tc.input)

			if detected != tc.expectDetect {
				t.Errorf("Résultat de détection inattendu: obtenu %v, attendu %v", detected, tc.expectDetect)
			}

			if fieldName != tc.expectField {
				t.Errorf("Nom du champ inattendu: obtenu '%s', attendu '%s'", fieldName, tc.expectField)
			}
		})
	}
}
