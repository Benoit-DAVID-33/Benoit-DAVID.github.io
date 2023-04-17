<?php
    switch ($action){            
            
        case 'view': {
            require_once("includes/core/models/daoCommentaire.php");
            $commentaireDAO = new CommentaireDAO();
            $id_film = isset($_GET['id']) ? htmlspecialchars($_GET['id'], ENT_QUOTES) : null;
        
            if (!$id_film) {
                $message = "Erreur : ID de film manquant ou invalide.";
            } else {
                $commentaires = $commentaireDAO->getCommentairesByIdFilm($id_film);
            }
            require_once("includes/core/views/movie_view.phtml");
            break;
        }
    }