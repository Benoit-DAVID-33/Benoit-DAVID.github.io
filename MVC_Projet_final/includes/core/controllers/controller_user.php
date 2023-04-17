<?php
	switch ($action){
		case 'login':{
			require_once "includes/core/models/daoUser.php";
			require_once "includes/core/models/Personne.php";
	
			if (!empty($_POST)){
				$loginSaisi = $_POST['userMail'];
				$mdpSaisi = $_POST['password'];
	
				if (userExists($loginSaisi)){
					if (checkAuth($loginSaisi, $mdpSaisi)){
						//C'est bon, je suis authentifié
						$_SESSION['login'] = $loginSaisi;
						$maPersonne=getUserByLogin($loginSaisi);
						$_SESSION['idUser'] = $maPersonne->getId();
						$_SESSION['isAdmin'] = isAdmin($loginSaisi);
						header('Location: '.$_SERVER['HTTP_REFERER']);
					}else{
						$message = "Mauvaises informations d'identification !";
					}
				}else{
					$message = "Cet utilisateur n'existe pas !";
				}
			}
			require_once "includes/core/views/view.phtml";
			break;  
		}
	
		case 'logout':{
			if (isset($_SESSION['login'])){
				unset($_SESSION['login']);
			}
			header('Location: index.php');
			break;
		}
	
		case 'view':{
			require_once "includes/core/models/daoUser.php";
			require_once "includes/core/models/daoContacts.php";
			require_once "includes/core/models/daoNewsletter.php";
			
			if (isset($_SESSION['login']) && $_SESSION['login'] != '' && $_SESSION['isAdmin'] == 1){
				$lesContacts = getAllContacts();
				
				$newsletterDAO = new NewsletterDAO();
				$lesNewsletters = $newsletterDAO->getAllSubscribers();
			}else{
				$lesContacts = array();
			    $idPersonne = $_SESSION['idUser'];
			    
			    $idFilms = getFavorisByPersonne($idPersonne);
			    $idFilms2 = getSeeByPersonne($idPersonne);
			    $idFilms3 = getFuturByPersonne($idPersonne);
			}
		
			require_once "includes/core/views/user_view.phtml";
			break;
		}
		
			case 'list':{
				require_once "includes/core/models/daoContacts.php";
	
				$lesContacts = getAllContacts();
				
				require_once "includes/core/views/user_view.phtml";
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
					header('Location: ?page=user&action=list');
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
