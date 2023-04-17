<?php
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