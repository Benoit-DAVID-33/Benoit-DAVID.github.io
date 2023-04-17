<?php
	
	switch ($action){
		case 'list':{
			require_once "includes/core/models/daoContacts.php";
			$lesContacts = getAllContacts();
			require_once "includes/core/views/user_view.phtml";
			break;
		}
		case 'view':{

			break;
		}
		case 'edit':{
			require_once "includes/core/models/daoContacts.php";
		
			$id = $_GET['id'];
				
				// ie doit récuperer les infos
			$unePersonne = getContactById($id);
				
			if (!empty($_POST)){
				
				$tmpFile = $_FILES['chAvatar']['tmp_name'];
				$destPath = 'public/avatar/';
				$fileName = $_FILES['chAvatar']['name'];
				$fullName = $destPath.$fileName;
				
				if ($fileName != ''){
					move_uploaded_file($tmpFile, $fullName);
				}else{
					$fullName = $unePersonne->getAvatar();
				}
				$unePersonne = new Personne(
					$_POST['chEmail'],
					$_POST['chPassword'],
					date_create($_POST['chDateNaissance']),
					$fullName
					);
				$unePersonne->setId($id);
				
				if (updateContact($unePersonne)){
					header('Location: ?page=user&action=list');
				}else{
					$message = "Erreur d'enregistrement !";
				}
			 }
			require_once "includes/core/views/form_contact.phtml";
			break;
		}
		
		case 'delete':{
			require_once "includes/core/models/daoContacts.php";
			
			$id = $_GET['id'] ?? 0;
			if (deleteContact($id)){
					header('Location: ?page=user&action=list');
				}else{
					$message = "Erreur de suppression !";
				}
			break;
		}
		
		case 'add':{
			require_once "includes/core/models/daoContacts.php";
			
			if (empty($_POST)){
				// J'arrive sur le formulaire
				$unePersonne = new Personne();
				
			}else{
				// Je viens de valider le formulaire : j'ai cliqué sur Submit
				$tmpFile = $_FILES['chAvatar']['tmp_name'];
				$destPath = 'public/avatar/';
				$fileName = $_FILES['chAvatar']['name'];
				$fullName = $destPath.$fileName;
				move_uploaded_file($tmpFile, $fullName);
				
				$default = "public/avatar/default.png";
				
				if ($fileName != ''){
					move_uploaded_file($tmpFile, $fullName);
				}else{
					$fullName = $default;
				}
				$unePersonne = new Personne(
					htmlentities($_POST['chEmail']),
					$_POST['chPassword'],
					date_create($_POST['chDateNaissance']),
					$fullName
					);
				if (insertContact($unePersonne)){
					header('Location: ?page=index');
				}else{
					$message = "Erreur d'enregistrement !";
				}
			}
			require_once "includes/core/views/form_contact.phtml";
			break;
		}
		default:{
		}
	}