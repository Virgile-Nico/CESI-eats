# Service d'authentification

Ce micro service est responsable de l'authentification des utilisateurs sur la plateforme CESI EATS. 
Il gère les mécanismes d'authentification, tels que les identifiants et les tokens, et fournit des services d'inscription, de connexion et de déconnexion sécurisés.  

## Routes
 - ### [ POST ] '/login?type=' : 
        Cette route permet aux différentes applications frontend d'émettre une demande de connexion en spécifiant le type d'utilisateur qui souhaite ce connecter.

        Données à mettre en body de la requète :

 - ### [ POST ] '/register?type=' : 
        Cette route permet aux différentes applications frontend d'émettre une demande de création de compte en spécifiant le type d'utilisateur qui souhaite ce connecter.

        Données à mettre en body de la requète :

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
