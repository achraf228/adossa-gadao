# ADOSSA-GADAO — Frontend (phase 1)

Plateforme culturelle de la fête traditionnelle Tem (Kotokoli) · React + Vite + Tailwind CSS 4 + Framer Motion.

## Démarrer
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production dans dist/
```

## Mode démonstration
`VITE_API_URL` vide (voir `.env.example`) = **aucune requête réseau**. Les données viennent de `src/data/`,
les écritures sont **simulées** et l'interface l'indique (« Mode démonstration… »).
Aucune inscription, connexion, candidature ou média n'est enregistré sur un serveur.
Dans l'admin, les modifications persistent seulement le temps de la session (rechargement = remise à zéro).

## Contenus à fournir (clairement signalés dans l'interface)
- Photos, vidéos et affiches : `src/data/site.js` → `IMAGES`, et `src/data/archives.js` (`src: null` = emplacement).
- Textes de la page Culture : `CULTURE_SECTIONS` (`provided: false` affiche « Texte à fournir »).
- Règlement et dates du Tem Aliya Kozoh, lieu / transport / hébergement : badges « À compléter ».
- Les années 2024 à 2026 des archives et les noms (membres, candidates, discussions) sont **fictifs**.

## Structure
```
src/
  components/{common,layout,navigation,cards,gallery,forms,animations,admin}
  pages/public  pages/admin   layouts/   routes/
  services/   api.js (Axios + mode démo) · publicService.js · adminService.js
  hooks/      useResource (loading|success|error|empty) · useCountdown · …
  data/       données de démonstration
```

## Préparer l'intégration Laravel (phase 2)
1. Renseigner `VITE_API_URL=https://votre-api/api`.
2. Chaque fonction de `src/services/*.js` appelle déjà Axios quand l'URL est définie. Routes attendues :
   `GET /archives/media`, `/archives/communiques`, `/culture/gallery`, `/candidates`, `/discussions`, `/memories` ·
   `POST /newsletter`, `/candidatures` (multipart), `/contributions`, `/memories`, `/auth/login`, `/auth/register`,
   `/discussions/{id}/replies` ·
   admin : `/admin/{editions,candidatures,messages,members,news,culture,media}` (GET/POST/PATCH/DELETE), `/admin/settings` (GET/PUT).
3. Ajouter le jeton d'authentification (Sanctum) et la protection des routes `/admin` : aucune authentification n'existe côté front pour l'instant.

## Accessibilité et animations
`MotionConfig reducedMotion="user"` + `prefers-reduced-motion` respectés ; animations limitées à `transform` / `opacity`,
jouées une seule fois au défilement ; navigation clavier, `aria-*` sur modales, menus, onglets et formulaires.
