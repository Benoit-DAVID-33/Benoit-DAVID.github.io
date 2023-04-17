<?php

    require_once "includes/core/models/Newsletter.php";
    require_once "includes/core/models/daoNewsletter.php";
    
        switch ($action){
            case 'add':{
                if (!empty($_POST['email'])) {
                    $newsletter = new Newsletter($_POST['email']);
                    $newsletterDAO = new NewsletterDAO();
                    if($newsletterDAO->addSubscriber($newsletter)){
                        header('Location: ?page=index');
                        exit();
                    } else {
                        $message = "Erreur d'enregistrement !";
                    }
                }
                break;
            }
            case 'delete':
                if (!empty($_GET['id'])) {
                    $newsletterDAO = new NewsletterDAO();
                    $id = $_GET['id'];
                    
                    $newsletter = new Newsletter('', null, $id);
                    
                    if ($newsletterDAO->removeSubscriber($newsletter)) {
                        header('Location: ?page=user&action=view');
                        exit();
                    } else {
                        $message = "Erreur de suppression !";
                    }
                }
                break;
            }
?>