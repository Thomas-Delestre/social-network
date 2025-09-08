# 📌 Social Network

Projet **Fullstack Social Network** avec un front en **Next.js** et un
back-end en **Go**.

------------------------------------------------------------------------

## 🖥 Front-end

Créé avec :

``` bash
npx create-next-app@latest front-end
```

Options : TypeScript, ESLint, TailwindCSS, App Router, Turbopack, alias
`@/*`.

------------------------------------------------------------------------

## ⚙️ Back-end Architecture

### 📂 `cmd/`

📌 Point d'entrée de l'application (fichiers `main.go`, lancement du
serveur).

------------------------------------------------------------------------

### 📂 `config/`

⚙️ Gestion de la configuration et de la base de données :\
- **cookie.go** 🍪 : génération, suppression et gestion des cookies.\
- **init_db.go** 🗄️ : initialisation et connexion à la base de données.\
- **struct.go** 🧩 : structures de données pour la DB et les requêtes.\
- **user.go** 👤 : méthodes liées aux utilisateurs (CRUD, gestion des
profils).

------------------------------------------------------------------------

### 📂 `router/`

🛣️ Gestion des routes de l'API via un `ServeMux`.\
- **router_config.go** 🔧 : configuration principale du routeur.\
- **post_routes.go** 📝 : routes liées aux posts.\
- **get_routes.go** 📥 : routes de lecture.\
- **auth_routes.go** 🔑 : routes dédiées à l'authentification.

------------------------------------------------------------------------

### 📂 `middleware/`

🧱 Fonctions exécutées **avant ou après les handlers** (contrôles
transversaux) :\
- 🔒 Vérification des cookies (sessions, tokens).\
- 🌐 Gestion du **CORS**.\
- 🛡 Protection basique contre les injections.\
- ⚠️ Gestion centralisée des erreurs.

👉 Règles globales de sécurité, validation et contrôle, indépendantes de
la logique métier.

------------------------------------------------------------------------

### 📂 `controller/`

🎯 Porte d'entrée des appels API :\
- réception et parsing des requêtes,\
- passage par les middlewares,\
- appel des services/DB,\
- renvoi des réponses (succès/erreur).

Exemples :\
- **auth_ctrl.go** 🔑 : gestion des rôles et autorisations.\
- **post_controller.go** 📝 : gestion des posts.\
- **comment_controller.go** 💬 : gestion des commentaires.\
- **like_controller.go** ❤️ : gestion des likes.\
- **follow_controller.go** 👥 : gestion des relations entre
utilisateurs.

------------------------------------------------------------------------

### 📂 `service/`

🧠 Logique métier de l'application (hors transport HTTP) :\
- **data_check.go** 🔍 : vérifications (ex : utilisateur existant).\
- **data_treatment.go** 🛠️ : traitements comme le hachage de mot de
passe.\
- **file_upload.go** 🖼️ : gestion des fichiers (upload d'images).

------------------------------------------------------------------------

### 📂 `utils/`

🧰 Fonctions utilitaires partagées dans l'application :\
- **hash.go** 🔑 : hachage des mots de passe.\
- **jwt.go** 🎟️ : gestion des tokens JWT.\
- **validator.go** ✅ : validation des données entrantes.\
- **response.go** 📦 : formatage standardisé des réponses API.\
- **logger.go** 📜 : configuration des logs.\
- **helpers.go** 🛠️ : fonctions d'aide diverses.

------------------------------------------------------------------------

### 📂 `test/`

🧪 Tests unitaires des fonctions (hors SQL).

Exécution depuis `/backend` :

``` bash
go test -v ./...
```

-   `-v` → mode verbeux pour plus de détails.