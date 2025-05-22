# social-network

Social Network

npx create-next-app@latest front-end

   - ✔ Would you like to use TypeScript? … No / Yes
   - ✔ Would you like to use ESLint? … No / Yes
   - ✔ Would you like to use Tailwind CSS? … No / Yes
   - ✔ Would you like your code inside a `src/` directory? … No / Yes
   - ✔ Would you like to use App Router? (recommended) … No / Yes
  -  ✔ Would you like to use Turbopack for `next dev`? … No / Yes
   - ✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
  - ✔ What import alias would you like configured? … @/*

Back-end architecture (exemple fichiers) :
- cmd
    Ce dossier contient le point d'entrée de votre application.

- config
    Ce dossier contient toutes les configurations de l'application.

    - config.go : Chargement des variables d'environnement et configuration générale
    - database.go : Configuration de la connexion à SQLite3
    - env.go : Gestion des variables d'environnement (dev, prod, test)
    - constants.go : Constantes utilisées dans toute l'application

- router
    Ce dossier gère toutes les routes de votre API.

    - router.go : Configuration principale du routeur
    - routes.go : Définition de toutes les routes
    - api_v1.go : Regroupement des routes pour l'API v1
    - auth_routes.go : Routes liées à l'authentification

- db_repository
    Ce dossier contient les fonctions d'accès à la base de données.

    - user_repository.go : Opérations CRUD pour les utilisateurs
    - post_repository.go : Opérations CRUD pour les posts
    - comment_repository.go : Opérations CRUD pour les commentaires
    - like_repository.go : Gestion des likes
    - follow_repository.go : Gestion des relations entre utilisateurs
    - migration.go : Scripts de migration de la base de données

- utils
    Ce dossier contient les fonctions utilitaires utilisées dans toute l'application.

    - hash.go : Fonctions de hachage pour les mots de passe
    - jwt.go : Gestion des tokens JWT
    - validator.go : Validation des données entrantes
    - response.go : Formatage des réponses API
    - logger.go : Configuration des logs
    - helpers.go : Fonctions d'aide diverses

- middleware
    Ce dossier contient les middlewares utilisés dans les routes.

    - auth_middleware.go : Vérification des tokens JWT
    - cors_middleware.go : Gestion des CORS
    - rate_limiter.go : Limitation du nombre de requêtes
    - logger_middleware.go : Logging des requêtes
    - error_handler.go : Gestion des erreurs

- controller
    Ce dossier contient les contrôleurs qui gèrent les requêtes entrantes.

    - user_controller.go : Gestion des requêtes liées aux utilisateurs
    - auth_controller.go : Gestion de l'authentification
    - post_controller.go : Gestion des posts
    - comment_controller.go : Gestion des commentaires
    - like_controller.go : Gestion des likes
    - follow_controller.go : Gestion des relations entre utilisateurs

- service
    Ce dossier contient la logique métier de l'application.

    - user_service.go : Logique métier pour les utilisateurs
    - auth_service.go : Logique d'authentification
    - post_service.go : Logique métier pour les posts
    - notification_service.go : Gestion des notifications
    - feed_service.go : Algorithme de génération du fil d'actualité
    - search_service.go : Fonctionnalités de recherche
    - file_service.go : Gestion des uploads de fichiers
