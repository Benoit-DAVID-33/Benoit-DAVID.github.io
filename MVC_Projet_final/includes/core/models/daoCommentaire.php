<?php
    require_once "includes/core/models/bdd.php";
    require_once "includes/core/models/Commentaire.php";
    
    class CommentaireDAO {
        
        function ajouterCommentaire(Commentaire $commentaire) {
            $conn = getConnexion();
                    
            $id_film = intval($commentaire->getIdFilm()); 
            $id_personne = $commentaire->getPersonne();
            $contenu = $commentaire->getContenu();
                    
            $SQLQuery = "INSERT INTO commenter (id_film, id_personne, contenu, date_commentaire) VALUES (:id_film, :id_personne, :contenu, NOW())";
            $SQLStmt = $conn->prepare($SQLQuery);
            $SQLStmt->bindParam(':id_film', $id_film);
            $SQLStmt->bindParam(':id_personne', $id_personne);
            $SQLStmt->bindParam(':contenu', $contenu);
            return $SQLStmt->execute();
        }

        function getCommentairesByIdFilm($id_film) {
                 
            $conn = getConnexion();
            $SQLQuery = "SELECT commenter.*, personne.email FROM commenter 
            INNER JOIN personne ON commenter.id_personne = personne.id_personne 
            WHERE commenter.id_film = :id_film";
            $SQLStmt = $conn->prepare($SQLQuery);
            $SQLStmt->bindParam(':id_film', $id_film);
            $SQLStmt->execute();
            return $SQLStmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        function getCommentaireById($id_commentaire) {
            $conn = getConnexion();
            $SQLQuery = "SELECT * FROM commenter WHERE id = :id_commentaire";
            $SQLStmt = $conn->prepare($SQLQuery);
            $SQLStmt->bindParam(':id_commentaire', $id_commentaire);
            $SQLStmt->execute();
            $result = $SQLStmt->fetch(PDO::FETCH_ASSOC);
            if (!$result) {
                return null;
            }
            $commentaire = new Commentaire($result['id']);
            $commentaire->setIdFilm($result['id_film']);
            $commentaire->setPersonne($result['id_personne']);
            $commentaire->setContenu($result['contenu']);
            $date_commentaire = new DateTime($result['date_commentaire']);
            $commentaire->setDateCommentaire($date_commentaire);
        
            return $commentaire;
        }

        function modifierCommentaire($id_commentaire, $nouveau_contenu) {
            $conn = getConnexion();
        
            $SQLQuery = "UPDATE commenter SET contenu = :contenu WHERE id = :id_commentaire";
            $SQLStmt = $conn->prepare($SQLQuery);
            $SQLStmt->bindParam(':contenu', $nouveau_contenu);
            $SQLStmt->bindParam(':id_commentaire', $id_commentaire);
            return $SQLStmt->execute();
        }

        function supprimerCommentaire($id_commentaire) {
            $conn = getConnexion();

            $SQLQuery = "DELETE FROM commenter WHERE id = :id_commentaire";
            $SQLStmt = $conn->prepare($SQLQuery);
            $SQLStmt->bindParam(':id_commentaire', $id_commentaire);
            return $SQLStmt->execute();
        }
    }
?>

