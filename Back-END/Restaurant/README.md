# Service restaurateurs

Ce micro service est responsable de toutes les actions utilisateurs de l'application front end restaurateur CESI EATS.
Il gère les mécanisme de gestion de compte, d'articles, de menus, de commandes

## Routes
 - ### [ POST ] '/update?type=' :
        Cette route permet à l'appliction frontend des restaurateurs d'émettre une demande de mise à jour d'informations du compte du restaurant

        Données à mettre en header de la requete :
          Type :
            Account
            Hours
            Article
            Menu
            Categories
          ID :
            Identifiant du restaurant

        Données à mettre en body de la requete :

 - ### [ POST ] '/delete?type=' :
        Cette route permet à l'application frontend des restaurateurs d'émettre une demande de supression de compte du resturant

        Données à mettre en header de la requete :
          Type :
            Account
            Hours
            Article
            Menu
            Categories

        Données à mettre en body de la requete :


Last update : 08/04/2024 by Virgile NICOLAS
