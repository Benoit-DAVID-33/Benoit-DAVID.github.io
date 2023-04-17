<?php

	/*
		?page=...&action=...&id=...

		page : Permettra de définir la section (ou page) à laquelle on veut accéder
		action : Permettra de définir l'action à effectuer sur cette section
		Le reste sera spécifique pour chaque section / action

		page : par défaut : index
		action : par defaut : view
	*/

	session_start();
	$page = $_GET['page'] ?? 'index';
	$action = $_GET['action'] ?? 'view'; 

	if (isset($_SESSION["login"])){
		require_once "includes/core/models/daoUser.php";
		$maPersonne=getUserByLogin($_SESSION["login"]);
	}
	switch ($page){
		case 'index':{
			require_once("includes/core/controllers/controller.php");
			break;
		}
		case 'contact':{
			require_once "includes/core/controllers/controller_contact.php";
			break;
		}
		case 'movie':{
			require_once "includes/core/controllers/controller_movie.php";
			break;
		}
		case 'user':{
			require_once "includes/core/controllers/controller_user.php";
			break;
		}
		case 'search':{
			require_once "includes/core/controllers/controller_search.php";
			break;
		}
		case 'api':{
			require_once "includes/core/controllers/controller_api.php";
			break;
		}
		case 'cinema':{
			require_once "includes/core/controllers/controller_cinema.php";
			break;
		}
		case 'about':{
			require_once "includes/core/controllers/controller_about.php";
			break;
		}
		case 'cgu':{
			require_once "includes/core/controllers/controller_cgu.php";
			break;
		}
		case 'cookies':{
			require_once "includes/core/controllers/controller_cookies.php";
			break;
		}
		case 'data':{
			require_once "includes/core/controllers/controller_data.php";
			break;
		}
		case 'newsletter':{ 
			require_once "includes/core/controllers/controller_newsletter.php";
			break;
		}	
		case 'commentaire':{ 
			require_once "includes/core/controllers/controller_commentaire.php";
			break;
		}
		default:{
			require_once("includes/core/controllers/controller_error.php");
		}
		
	}
	
