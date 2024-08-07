# Service d'authentification

Ce micro service est responsable de l'authentification des utilisateurs sur la plateforme CESI EATS. 
Il gère les mécanismes d'authentification, tels que les identifiants et les tokens, et fournit des services d'inscription, de connexion et de déconnexion sécurisés.  

## Routes
 - ### [ POST ] '/login?type=' : 
        Cette route permet aux différentes applications frontend d'émettre une demande de connexion en spécifiant le type d'utilisateur qui souhaite ce connecter.

        Données à mettre en body de la requète :

        ```json
            {
                "email": "john.smith@exemple.com",
                "password": "motdepasse"
            }
        ```

        L'application frontend se charge en fonction d'ajouter le type d'utilisateur.

 - ### [ POST ] '/register?type=' : 
        Cette route permet aux différentes applications frontend d'émettre une demande de création de compte en spécifiant le type d'utilisateur qui souhaite ce connecter.

        Données à mettre en body de la requète :

        - Utilisateur :

        ```json
            {
                "firstName": "John",
                "lastName": "Smith",
                "email": "john.smith@exemple.com",
                "phone": "0606060606",
                "password": "motdepasse"
            }
        ```

        - Restaurant :

        ```json
            {
                "social":"CESIeats",
                "email": "cesi.eats@exemple.com",
                "phone": "0606060606",
                "city": "Nancy",
                "adress": "36 boulevard de l'exemple",
                "cityCode": "54000",
                "password": "motdepasse",
            }
        ```

        - Livreur : 

        ```json
            {
                "firstName": "John",
                "lastName": "Smith",
                "email": "john.smith@exemple.com",
                "phone": "0606060606",
                "password": "motdepasse"
            }
        ```

        - Commercial, Technique

        Création du compte par un utilisateurs du même type.

        - Développeur Tiers

        ```json
            {
                "firstName": "John",
                "lastName": "Smith",
                "email": "john.smith@exemple.com",
                "phone": "0606060606",
                "password": "motdepasse",
                "application": "une application cool"
            }
        ```

        L'application frontend se charge en fonction d'ajouter le type d'utilisateur.

 - ### [ GET ] '/authenticate' : 
        Cette route permet d'émettre une demande d'authentification en spécifiant le type d'utilisateur qui souhaite ce connecter à chaques requètes effectuées sur les services de notre application. 

Il est nécessaire sur chacune des routes ou il est annoté **'?type='** de spécifier le type d'utilisateur souhaitant ce connecter. Pour ce faire voici un tableau des mot clé correspondant à chacun des types d'utilisateur.

| Type d'utilisateur | Mot clé |
| --- | --- |
| Client | user |
| Restaurant | restaurant |
| Livreur | delivery |
| Commercial, Technique | intern |
| Développeur tiers | tiers |

Last update : 03/04/2024 by MaximeCESI
