<?php
    class Newsletter {
        private $id;
        private $email;
        private $dateEnvoi;
    
       public function __construct($email, $dateEnvoi = null, $id = null) {
        $this->id = $id;
        $this->email = $email;
        $this->dateEnvoi = $dateEnvoi;
    }
    
    
        public function getId() {
            return $this->id;
        }
    
        public function getEmail() {
            return $this->email;
        }
    
        public function getDateEnvoi() {
            return $this->dateEnvoi;
        }
    
        public function setDateEnvoi($dateEnvoi) {
            $this->dateEnvoi = $dateEnvoi;
        }
    
        public function setId($id) {
            $this->id = $id;
        }
    
    }