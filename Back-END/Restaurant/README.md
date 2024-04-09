# Service restaurateurs

Ce micro service est responsable de toutes les actions utilisateurs de l'application front end restaurateur CESI EATS.
Il gère les mécanisme de gestion de compte, d'articles, de menus, de commandes

## Routes
 - ### [ POST ] '/create?type=' :
        Cette route permet à l'application fronted des restauraturs d'émètre une demande de création d'horaires d'ouverture de restaurnt, de création d'article ou de menu.

        Données à mettre en header de la requete :
          Type :
            Hours
            Article
            Menu
          ID :
            Identifiant du restaurant, de l'article ou du menu
        
        Données à mettre en body de la requete en fonction du cas d'utilisation :
          Hours :
            Day : Jour d'ouverture
            Open : Heure d'ouverture
            Close : heure de fermeture
          Article :
            Nom : Nom de l'article
            Description : Description de l'article
            Prix : Prix de l'article
          Menu :
            Nom : Nom du menu
            Description : Description du menu
            Prix : Prix du menu
            Articles : Liste d'identifiants d'articles

 - ### [ GET ] '/read?type=' :  
        Cette route permet à l'applicaiton frontend des restaurateurs de récupérer les informations du restaurant, de ses horaires, de ses articles ou encore de ses menus.

        Données à mettre en header de la requete :
          Type :
            Account
            Hours
            Article
            Menu
          ID :
            Identifiant du restaurant, de l'article ou du menu

 - ### [ POST ] '/update?type=' :
        Cette route permet à l'appliction frontend des restaurateurs d'émettre une demande de mise à jour d'informations du compte du restaurant, d'un article, d'un horaire ou d'un menu

        Données à mettre en header de la requete :
          Type :
            Account
            Hours
            Article
            Menu
          ID :
            Identifiant du restaurant ou de l'item (article, horraire, menu) à mettre à jour
        
        Données à mettre en body de la requete en fonction du cas d'utilisation :
          Account :
            MAIL : Adresse email du compte
            PASSWORD : mot de passe du compte
            NOM : nom du restaurant
            TEL : n° de téléphone du restaurant
            CP : code postal
            VILLE : Vill du restaurant
            ADRESSE : Adresse postale
            SIRET : n° de siret de l'entreprise
            RIB : relevé d'identité Bancaire du restaurant
            categories : Liste des noms de catégories du restaurant
          Hours :
            Day : Jour d'ouverture
            Open : Heure d'ouverture
            Close : heure de fermeture
          Article :
            Nom : Nom de l'article
            Description : Description de l'article
            Prix : Prix de l'article
          Menu :
            Nom : Nom du menu
            Description : Description du menu
            Prix : Prix du menu
            Articles : Liste d'identifiants d'articles

 - ### [ POST ] '/delete?type=' :
        Cette route permet à l'application frontend des restaurateurs d'émettre une demande de supression de compte du resturant

        Données à mettre en header de la requete :
          Type :
            Account
            Hours
            Article
            Menu
          ID : 
            Identifiant du restaurant, ou de l'horraire, de l'article ou encore du menu à supprimer


Last update : 09/04/2024 by Virgile NICOLAS
