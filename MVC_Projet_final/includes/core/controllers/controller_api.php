<?php
    switch ($action){
        case 'addToFav':{
            require_once "includes/core/models/daoUser.php";
          
            if (!empty($_POST)){
                $id_film = $_POST['idFilm'];
                $id_personne = $_POST['idPersonne'];
                if (insertFav($id_film, $id_personne)){
                    http_response_code(200);
                    header('Content-Type', 'application/json');
                    print(json_encode(array('ok')));
                }else{
                    http_response_code(500);
                    header('Content-Type', 'application/json');
                    print(json_encode(array('ko')));
                }
            }else{
                http_response_code(404);
                header('Content-Type', 'application/json');
                print(json_encode(array('erreur de valeur')));
            }
            break;
        } 
        
        case 'deleteToFav':{
            require_once "includes/core/models/daoUser.php";
            
            if (!empty($_POST)){
                $id_film = $_POST['idFilm'];
                $id_personne = $_POST['idPersonne'];
                if (deleteFav($id_film, $id_personne)){
                    http_response_code(200);
                    header('Content-Type', 'application/json');
                    print(json_encode(array('ok')));
                }else{
                    http_response_code(500);
                    header('Content-Type', 'application/json');
                    print(json_encode(array('ko')));
                }
            }else{
                http_response_code(404);
                header('Content-Type', 'application/json');
                print(json_encode(array('erreur de valeur')));
            }
            break;
        }
        
        case 'checkToFav':{
            require_once "includes/core/models/daoUser.php";
            
            $id_film = $_GET['idFilm'];
            $id_personne = $_GET['idPersonne'];
            http_response_code(200);
            header('Content-Type', 'application/json');
            if (checkFav($id_film, $id_personne)){
                print(json_encode(array('inFav' => '1')));
            }else{
                print(json_encode(array('inFav' => '0')));
            }
            break;
        }
            
        case 'addToSee':{
            require_once "includes/core/models/daoUser.php";
          
            if (!empty($_POST)){
                $id_film = $_POST['idFilm'];
                $id_personne = $_POST['idPersonne'];
                if (insertSee($id_film, $id_personne)){
                    http_response_code(200);
                    header('Content-Type', 'application/json');
                    print(json_encode(array('ok')));
                }else{
                    http_response_code(500);
                    header('Content-Type', 'application/json');
                    print(json_encode(array('ko')));
                }
            }else{
                http_response_code(404);
                header('Content-Type', 'application/json');
                print(json_encode(array('erreur de valeur')));
            }
            break;
        } 
        
        case 'deleteToSee':{
            require_once "includes/core/models/daoUser.php";
            
            if (!empty($_POST)){
                $id_film = $_POST['idFilm'];
                $id_personne = $_POST['idPersonne'];
                if (deleteSee($id_film, $id_personne)){
                    http_response_code(200);
                    header('Content-Type', 'application/json');
                    print(json_encode(array('ok')));
                }else{
                    http_response_code(500);
                    header('Content-Type', 'application/json');
                    print(json_encode(array('ko')));
                }
            }else{
                http_response_code(404);
                header('Content-Type', 'application/json');
                print(json_encode(array('erreur de valeur')));
            }
            break;
        }
        
        case 'checkToSee':{
            require_once "includes/core/models/daoUser.php";
            
            $id_film = $_GET['idFilm'];
            $id_personne = $_GET['idPersonne'];
            http_response_code(200);
            header('Content-Type', 'application/json');
            if (checkSee($id_film, $id_personne)){
                print(json_encode(array('inSee' => '1')));
            }else{
                print(json_encode(array('inSee' => '0')));
            }
            break;
        }
        
        case 'addToFutur':{
            require_once "includes/core/models/daoUser.php";
          
            if (!empty($_POST)){
                $id_film = $_POST['idFilm'];
                $id_personne = $_POST['idPersonne'];
                if (insertFutur($id_film, $id_personne)){
                    http_response_code(200);
                    header('Content-Type', 'application/json');
                    print(json_encode(array('ok')));
                }else{
                    http_response_code(500);
                    header('Content-Type', 'application/json');
                    print(json_encode(array('ko')));
                }
            }else{
                http_response_code(404);
                header('Content-Type', 'application/json');
                print(json_encode(array('erreur de valeur')));
            }
            break;
        } 
        
        case 'deleteToFutur':{
            require_once "includes/core/models/daoUser.php";
            
            if (!empty($_POST)){
                $id_film = $_POST['idFilm'];
                $id_personne = $_POST['idPersonne'];
                if (deleteFutur($id_film, $id_personne)){
                    http_response_code(200);
                    header('Content-Type', 'application/json');
                    print(json_encode(array('ok')));
                }else{
                    http_response_code(500);
                    header('Content-Type', 'application/json');
                    print(json_encode(array('ko')));
                }
            }else{
                http_response_code(404);
                header('Content-Type', 'application/json');
                print(json_encode(array('erreur de valeur')));
            }
            break;
        }
        
        case 'checkToFutur':{
            require_once "includes/core/models/daoUser.php";
            
            $id_film = $_GET['idFilm'];
            $id_personne = $_GET['idPersonne'];
            http_response_code(200);
            header('Content-Type', 'application/json');
            if (checkFutur($id_film, $id_personne)){
                print(json_encode(array('inFutur' => '1')));
            }else{
                print(json_encode(array('inFutur' => '0')));
            }
            break;
        }
        
        default: {
            http_response_code(404);
            header('Content-Type', 'application/json');
            print(json_encode(array('action inconnue')));
        }
    }
    