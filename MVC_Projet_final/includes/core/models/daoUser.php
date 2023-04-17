<?php
	require_once "includes/core/models/bdd.php";
	require_once "includes/core/models/Personne.php";

	function userExists(string $login): bool{
		$conn = getConnexion();

		$SQLQuery = "
			SELECT COUNT(id_personne) as existe
			FROM personne
			WHERE email = :login
		";
		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':login', $login, PDO::PARAM_STR);
		$SQLStmt->execute();

		$SQLRow = $SQLStmt->fetch(PDO::FETCH_ASSOC);
		$loginTrouve = $SQLRow['existe'];
		$SQLStmt->closeCursor();
		return ($loginTrouve > 0);
	}

	function checkAuth(string $login, string $mdp): bool{
		$conn = getConnexion();
		$SQLQuery = "
			SELECT password
			FROM personne
			WHERE email = :login	
		";
		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':login', $login, PDO::PARAM_STR);
		$SQLStmt->execute();

		$SQLRow = $SQLStmt->fetch(PDO::FETCH_ASSOC);
		$motDePasseStocke = $SQLRow['password'];
		$SQLStmt->closeCursor();
		return (password_verify($mdp, $motDePasseStocke));
	}
	
	function isAdmin(string $login): bool{
		$conn = getConnexion();
		$SQLQuery = "
			SELECT is_admin
			FROM personne
			WHERE email = :login	
		";
		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':login', $login, PDO::PARAM_STR);
		$SQLStmt->execute();

		$SQLRow = $SQLStmt->fetch(PDO::FETCH_ASSOC);
		$admin = $SQLRow['is_admin'];
		$SQLStmt->closeCursor();
		return ($admin > 0);
	}
	
	function getUserByLogin(string $login): Personne{
			$conn = getConnexion();
		
		$SQLQuery = "
			SELECT id_personne, email, password, date_naissance, avatar
			FROM personne
			WHERE email = :login	
		";
		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':login', $login, PDO::PARAM_STR);
		$SQLStmt->execute();

		$SQLRow = $SQLStmt->fetch(PDO::FETCH_ASSOC);
		$unePersonne = new Personne($SQLRow['email'],$SQLRow['password'], date_create($SQLRow['date_naissance']), $SQLRow['avatar']);
		$unePersonne->setId($SQLRow['id_personne']);
		$SQLStmt->closeCursor();
		return ($unePersonne);

	}
	
	/////////////////////////////////////////////////////////////////////////////////////
	
	
	function insertFav (int $idFilm, int $idPersonne): bool {
		// INSERT DANS LA BDD 
		$conn = getConnexion();

		$SQLQuery = "INSERT INTO favoris_film(id_film, id_personne)
		VALUES (:id_film, :id_personne)";

		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':id_film', $idFilm, PDO::PARAM_INT);
		$SQLStmt->bindValue(':id_personne', $idPersonne, PDO::PARAM_INT);
		if (!$SQLStmt->execute()){
			return false;
		}else{
			return true;
		}
	}
	
	function deleteFav (int $idFilm, int $idPersonne): bool{
		$conn = getConnexion();

		$SQLQuery = "DELETE 
			FROM favoris_film 
			WHERE id_film = :idFilm and id_personne = :idPersonne";
			

		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':idFilm', $idFilm, PDO::PARAM_INT);
		$SQLStmt->bindValue(':idPersonne', $idPersonne, PDO::PARAM_INT);
		return $SQLStmt->execute();

		}	
		
		
	function checkFav (int $idFilm, int $idPersonne): bool{
		$conn = getConnexion();

		$SQLQuery = "SELECT COUNT(id_film)
			FROM favoris_film 
			WHERE id_film = :idFilm and id_personne = :idPersonne";
			
		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':idFilm', $idFilm, PDO::PARAM_INT);
		$SQLStmt->bindValue(':idPersonne', $idPersonne, PDO::PARAM_INT);
		$SQLStmt->execute();
		$retVal = $SQLStmt->fetch(PDO::FETCH_NUM)[0];
		$SQLStmt->closeCursor();
		return ($retVal > 0);
	}	
		
	
	function getFavorisByPersonne(int $idPersonne): array {
	    $conn = getConnexion();
	    $SQLQuery = "SELECT id_film FROM favoris_film WHERE id_personne = :idPersonne";
	    $SQLStmt = $conn->prepare($SQLQuery);
	    $SQLStmt->bindValue(':idPersonne', $idPersonne, PDO::PARAM_INT);
	    $SQLStmt->execute();
	    $retVal = $SQLStmt->fetchAll(PDO::FETCH_COLUMN);
	    $SQLStmt->closeCursor();
	    return $retVal;
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////	
			
			
	function insertSee (int $idFilm, int $idPersonne): bool {
		// INSERT DANS LA BDD 
		$conn = getConnexion();

		$SQLQuery = "INSERT INTO avoir(id_film, id_personne)
		VALUES (:id_film, :id_personne)";

		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':id_film', $idFilm, PDO::PARAM_INT);
		$SQLStmt->bindValue(':id_personne', $idPersonne, PDO::PARAM_INT);
		if (!$SQLStmt->execute()){
			return false;
		}else{
			return true;
		}
	}
	
	function deleteSee (int $idFilm, int $idPersonne): bool{
		$conn = getConnexion();
		$SQLQuery = "DELETE 
			FROM avoir 
			WHERE id_film = :idFilm and id_personne = :idPersonne";
			
		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':idFilm', $idFilm, PDO::PARAM_INT);
		$SQLStmt->bindValue(':idPersonne', $idPersonne, PDO::PARAM_INT);
		return $SQLStmt->execute();
		}	

	function checkSee (int $idFilm, int $idPersonne): bool{
		$conn = getConnexion();
		$SQLQuery = "SELECT COUNT(id_film)
			FROM avoir 
			WHERE id_film = :idFilm and id_personne = :idPersonne";
			
		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':idFilm', $idFilm, PDO::PARAM_INT);
		$SQLStmt->bindValue(':idPersonne', $idPersonne, PDO::PARAM_INT);
		$SQLStmt->execute();
		$retVal = $SQLStmt->fetch(PDO::FETCH_NUM)[0];
		$SQLStmt->closeCursor();
		return ($retVal > 0);
		}	
		
	function getSeeByPersonne(int $idPersonne): array {
	    $conn = getConnexion();
	    $SQLQuery = "SELECT id_film FROM avoir WHERE id_personne = :idPersonne";
	    $SQLStmt = $conn->prepare($SQLQuery);
	    $SQLStmt->bindValue(':idPersonne', $idPersonne, PDO::PARAM_INT);
	    $SQLStmt->execute();
	    $retVal = $SQLStmt->fetchAll(PDO::FETCH_COLUMN);
	    $SQLStmt->closeCursor();
	    return $retVal;
	}
		
		
	////////////////////////////////////////////////////////////////////////////////////
		
		
	function insertFutur (int $idFilm, int $idPersonne): bool {
		// INSERT DANS LA BDD 
		$conn = getConnexion();
		$SQLQuery = "INSERT INTO voir(id_film, id_personne)
		VALUES (:id_film, :id_personne)";

		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':id_film', $idFilm, PDO::PARAM_INT);
		$SQLStmt->bindValue(':id_personne', $idPersonne, PDO::PARAM_INT);
		if (!$SQLStmt->execute()){
			return false;
		}else{
			return true;
		}
	}
	
	function deleteFutur (int $idFilm, int $idPersonne): bool{
		$conn = getConnexion();

		$SQLQuery = "DELETE 
			FROM voir 
			WHERE id_film = :idFilm and id_personne = :idPersonne";
			
		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':idFilm', $idFilm, PDO::PARAM_INT);
		$SQLStmt->bindValue(':idPersonne', $idPersonne, PDO::PARAM_INT);
		return $SQLStmt->execute();
		}	

	function checkFutur (int $idFilm, int $idPersonne): bool{
		$conn = getConnexion();

		$SQLQuery = "SELECT COUNT(id_film)
			FROM voir 
			WHERE id_film = :idFilm and id_personne = :idPersonne";
			
		$SQLStmt = $conn->prepare($SQLQuery);
		$SQLStmt->bindValue(':idFilm', $idFilm, PDO::PARAM_INT);
		$SQLStmt->bindValue(':idPersonne', $idPersonne, PDO::PARAM_INT);
		$SQLStmt->execute();
		$retVal = $SQLStmt->fetch(PDO::FETCH_NUM)[0];
		$SQLStmt->closeCursor();
		return ($retVal > 0);
		}	
		
	function getFuturByPersonne(int $idPersonne): array {
	    $conn = getConnexion();
	    $SQLQuery = "SELECT id_film FROM voir WHERE id_personne = :idPersonne";
	    $SQLStmt = $conn->prepare($SQLQuery);
	    $SQLStmt->bindValue(':idPersonne', $idPersonne, PDO::PARAM_INT);
	    $SQLStmt->execute();
	    $retVal = $SQLStmt->fetchAll(PDO::FETCH_COLUMN);
	    $SQLStmt->closeCursor();
	    return $retVal;
	}
