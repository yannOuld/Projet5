---
presentation:
  theme: beige.css
  progress: true
  slideNumber: true
  history: true
  keyboard: true
---

<!-- slide -->

# Projet 5

# Site de e-commerce Orinonco

par **Yannis ould abderrahmane**

<!-- slide -->

## ORINOCAM

ventes de cameras vintage

<!-- slide -->

### Constitution du site

- Une page index contenant une liste de cartes de tout les produits

- une page Produit dynamique

- une page Panier contenant un tableau et un formulaire de commande

- une page de Validation de commande renvoyant l'id de la commande et le prix du panier

<!-- slide -->

### Page Index

- utilisation de fetch pour la récuperation des produits
- injection Html avec un la methode map pour créée les cartes de chaque produit

<!-- slide -->

### Page Produits

- récuperation de l'id du produit avec window.location.search et urlSearchParams
- fetch du produit selectionné avec l'id
- Création du contenu avec un Template Html
- utilisation du local Storage pour enregistrer le produit dans le navigateur

<!-- slide -->

### Page Panier

- Récuperation des valeurs du local storage et injection dans le tableau des produits
- Boutons pour supprimer un produit selectionné
- Bouton pour vider le panier
- Total du prix du panier
- Verification du formulaire
- Requête Post à l'API qui crée un objet dans le local storage

<!-- slide -->

### Validation de Commande

- Récuperation de l'id de commande et du prix Total
- Injection Html des elements à leurs espaces dédiés

<!-- slide -->

### Implementation suplementaire

- Panier de l'interface utilisateur
