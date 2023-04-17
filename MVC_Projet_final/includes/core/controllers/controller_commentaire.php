<?php
require_once "includes/core/models/Commentaire.php";
require_once "includes/core/models/daoCommentaire.php";

        // Vérification de la connexion de l'utilisateur
        if (!isset($_SESSION['idUser'])) {
            header('Location: ?page=index');
            exit();
        }
        
        $id_personne = $_SESSION['idUser'];
        if (!$id_personne) {
            $message = "Erreur : Utilisateur non connecté.";
            // rediriger l'utilisateur vers la page de connexion
            header('Location: ?page=index');
            exit();
        }
    
    switch ($action) {
        case 'add': {
            // Récupération des informations depuis l'URL et le formulaire
            $id_film = isset($_GET['id']) ? htmlspecialchars($_GET['id'], ENT_QUOTES) : null;
            $contenu = isset($_POST['contenu']) ? htmlspecialchars($_POST['contenu'], ENT_QUOTES) : null;
            $id_personne = isset($_SESSION['idUser']) ? $_SESSION['idUser'] : null;
            // Vérification de la validité des données
            if (!$id_film || !$id_personne || !$contenu) {
                $message = "Erreur : Données manquantes ou invalides.";
                break;
            }
            // Création de l'objet Commentaire
            $commentaire = new Commentaire(null, $id_film, $id_personne, $contenu);
            // Appel de la méthode pour ajouter le commentaire
            $commentaireDAO = new CommentaireDAO();
            if ($commentaireDAO->ajouterCommentaire($commentaire)) {
                header('Location: ?page=movie&action=view&id=' . $id_film);
                exit();
            } else {
                $message = "Erreur d'enregistrement !";
            }
            break;
        }

        
        case 'modify': {
            // Récupération des informations depuis le formulaire
            $id_commentaire = isset($_POST['id']) ? htmlspecialchars($_POST['id'], ENT_QUOTES) : null;
            $contenu = isset($_POST['contenu']) ? htmlspecialchars($_POST['contenu'], ENT_QUOTES) : null;
            // Vérification de la validité des données
            if (!$id_commentaire || !$contenu) {
                $message = "Erreur : Données manquantes ou invalides.";
                break;
            }
            $id_film = isset($_GET['id']) ? intval($_GET['id']) : null;
            if (!$id_film) {
                throw new Exception('Identifiant de film manquant');
            }
            // Appel de la méthode pour modifier le commentaire
            $commentaireDAO = new CommentaireDAO();
            if ($commentaireDAO->modifierCommentaire($id_commentaire, $contenu)) {
                header('Location: ?page=movie&action=view&id=' . $id_film);
                exit();
            } else {
                $message = "Erreur de modification !";
            }
            break;
        }
        
        case 'delete': {
            // Récupération de l'identifiant du commentaire à supprimer depuis l'URL
            $id_commentaire = isset($_GET['id']) ? htmlspecialchars($_GET['id'], ENT_QUOTES) : null;
            // Vérification de la validité de l'identifiant
            if (!$id_commentaire) {
                $message = "Erreur : Identifiant manquant ou invalide.";
                break;
            }
            $commentaireDAO = new CommentaireDAO();
            // Récupération des commentaires du film depuis la base de données
            $commentaire = $commentaireDAO->getCommentaireById($id_commentaire);
            $commentaires = $commentaireDAO->getCommentairesByIdFilm($commentaire->getIdFilm());
        
            // Vérification que le commentaire existe
            $found_commentaire = null;
                foreach ($commentaires as $com) {
                    if ($com['id'] == $id_commentaire) {
                        $date_commentaire = DateTime::createFromFormat('Y-m-d H:i:s', $com['date_commentaire']);
                        $found_commentaire = new Commentaire($com['id'], $com['id_film'], $com['id_personne'], $com['contenu'], $date_commentaire);
                        $found_commentaire->setId($com['id']);
                        break;
                    }
                }
            if (!$found_commentaire) {
                $message = "Erreur : Le commentaire n'existe pas.";
                break;
            }
            // Utilisation de $found_commentaire à la place de $commentaire
            if ($found_commentaire->getPersonne() != $id_personne && $_SESSION['isAdmin'] != 1) {
                $message = "Erreur : Vous n'êtes pas autorisé à supprimer ce commentaire.";
                break;
            }
            // Suppression du commentaire
            if ($commentaireDAO->supprimerCommentaire($found_commentaire->getId())) {
                header('Location: ?page=movie&action=view&id=' . $found_commentaire->getIdFilm());
                exit();
            } else {
                $message = "Erreur : La suppression du commentaire a échoué.";
                break;
            }
        }
}