<?php
    
    class Commentaire {
            private $id, $idFilm, $personne, $contenu, $dateCommentaire;
        
            public function __construct($id, $idFilm = 0, $personne = null, $contenu = '', $dateCommentaire = null) {
                $this->id = $id;
                $this->idFilm = $idFilm;
                $this->personne = $personne;
                $this->contenu = htmlentities($contenu);
                $this->dateCommentaire = $dateCommentaire ?? new DateTime();
            }
        
            public function getId() {
                return $this->id;
            }
        
            public function setId($id) {
                $this->id = $id;
            }
        
            public function getIdFilm() {
                return $this->idFilm;
            }
        
            public function setIdFilm($idFilm) {
                $this->idFilm = $idFilm;
            }
        
            public function getPersonne() {
                return $this->personne;
            }
        
            public function setPersonne($personne) {
                $this->personne = $personne;
            }
        
            public function getContenu() {
                return $this->contenu;
            }
        
            public function setContenu($contenu) {
                $this->contenu = htmlentities($contenu);
            }
        
            public function getDateCommentaire() {
                return $this->dateCommentaire;
            }
        
            public function setDateCommentaire(DateTime $dateCommentaire) {
                $this->dateCommentaire = $dateCommentaire;
            }
        }


