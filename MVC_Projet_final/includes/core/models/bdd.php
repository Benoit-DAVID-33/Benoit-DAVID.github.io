<?php
	function getConnexion(){
		// Etape 1 : la connexion
		$server = 'db.3wa.io';
		$port = '3306';
		$dbname = 'benoitdavid_projet_final';
		$username = 'benoitdavid';
		$password = '30dfb694ac16b17e016ad25722364270';

		// Construction de la chaîne de connexion : Data Source Name
		$dsn = "mysql:host=$server;port=$port;dbname=$dbname;charset=utf8";
		$retVal = null;
		try{
			$retVal = new PDO($dsn, $username, $password);
		}catch(PDOException $ex){
			print('Pas possible de se connecter !!!');
			die();
		}
		return $retVal;
	}
	
		// function getConnexion(){
	// 	// Etape 1 : la connexion
	// 	$server = 'db.3wa.io';
	// 	$port = '3306';
	// 	$dbname = 'michelgillet_mycontacts';
	// 	$username = 'michelgillet';
	// 	$password = '1f8954c8a41113c75884ee98f76d3c4d';

	// 	// Construction de la chaîne de connexion : Data Source Name
	// 	$dsn = "mysql:host=$server;port=$port;dbname=$dbname;charset=utf8";
	// 	$retVal = null;
	// 	try{
	// 		$retVal = new PDO($dsn, $username, $password);
	// 	}catch(PDOException $ex){
	// 		print('Pas possible de se connecter !!!');
	// 		die();
	// 	}
	// 	return $retVal;