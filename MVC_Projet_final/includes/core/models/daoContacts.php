<?php
	require_once "includes/core/models/bdd.php";
	require_once "includes/core/models/Personne.php";

	//Fonction qui exécute le SELECT ... FROM contacts et renvoie le résultat sous la forme attendue
	function getAllContacts(): array{
		$conn = getConnexion();

		$SQLQuery = "SELECT p.id_personne, p.email, p.password, p.avatar, p.date_naissance
			FROM personne p";

		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->execute();
		
		$listePersonnes = array();
		while ($SQLRow = $SQLStmt->fetch(PDO::FETCH_ASSOC)){
			
			$unePersonne = new Personne($SQLRow['email'], $SQLRow['password'], date_create($SQLRow['date_naissance']), $SQLRow['avatar']);
			$unePersonne->setId($SQLRow['id_personne']);
			$listePersonnes[] = $unePersonne;
		}
		$SQLStmt->closeCursor();
		return $listePersonnes;
	}

	function insertContact(Personne $newPersonne): bool {
		// INSERT DANS LA BDD 
		$conn = getConnexion();

		$SQLQuery = "INSERT INTO personne(email, password, avatar, date_naissance)
		VALUES (:email, :password, :avatar, :date_naissance)";

		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':email', $newPersonne->getEmail(), PDO::PARAM_STR);
		$SQLStmt->bindValue(':password', password_hash($newPersonne->getPassword(),PASSWORD_BCRYPT), PDO::PARAM_STR);
		$SQLStmt->bindValue(':avatar', $newPersonne->getAvatar(), PDO::PARAM_STR);
		$SQLStmt->bindValue(':date_naissance', $newPersonne->getDateNaissance()->format('Y-m-d'), PDO::PARAM_STR);
		
		
		if (!$SQLStmt->execute()){
			return false;
		}else{
			return true;
		}
	}
		
	function getContactById(int $id){
		$conn = getConnexion();
		
		$SQLQuery = "SELECT p.id_personne, email, password, avatar, date_naissance
			FROM personne p
			WHERE p.id_personne = :id";
		
		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':id', $id, PDO::PARAM_INT);
		$SQLStmt->execute();

		$SQLRow = $SQLStmt->fetch(PDO::FETCH_ASSOC);
		$unePersonne = new Personne($SQLRow['email'], $SQLRow['password'], date_create($SQLRow['date_naissance']), $SQLRow['avatar']);
		$unePersonne->setId($SQLRow['id_personne']);
		$SQLStmt->closeCursor();
		return $unePersonne;
	}
	
	function updateContact(Personne $newPersonne): bool {
		// INSERT DANS LA BDD 
		$conn = getConnexion();

		$SQLQuery = "UPDATE personne SET email= :email, password= :password, avatar= :avatar, date_naissance= :date_naissance
		WHERE id_personne = :id";

		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':id', $newPersonne->getId(), PDO::PARAM_INT);
		$SQLStmt->bindValue(':email', $newPersonne->getEmail(), PDO::PARAM_STR);
		$SQLStmt->bindValue(':password', password_hash($newPersonne->getPassword(),PASSWORD_BCRYPT), PDO::PARAM_STR);
		$SQLStmt->bindValue(':avatar', $newPersonne->getAvatar(), PDO::PARAM_STR);
		$SQLStmt->bindValue(':date_naissance', $newPersonne->getDateNaissance()->format('Y-m-d'), PDO::PARAM_STR);
		
		if (!$SQLStmt->execute()){
			return false;
		}else{
			return true;
		}
	}

	function deleteContact(int $id): bool{
		$conn = getConnexion();

		$SQLQuery = "DELETE 
			FROM personne 
			WHERE id_personne = :id";
			
		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':id', $id, PDO::PARAM_INT);
		return $SQLStmt->execute();
}
