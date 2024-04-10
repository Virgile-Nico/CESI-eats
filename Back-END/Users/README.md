# Service clients

Ce micro service est responsable de toutes les actions utilisateurs de l'application front end clients CESI EATS.
Il gère les mécanisme de gestion de compte, de commandes, d'adresses et de cartes bancaires

## Routes
 - ### [ POST ] '/create' :
        Cette route permet à l'application fronted des clients d'émètre une demande de création de commande, d'adresse ou de carte bancaire.

        Données à mettre en header de la requete :
          Type :
            Order
            Address
            card
          ID :
            Identifiant du client
        
        Données à mettre en body de la requete en fonction du cas d'utilisation :
          Order :
            ```json
            {
                "ID_restaurant": ,
                "ID_delivery": ,
                "Total_price": ,
                "Number_products": ,
                "Status": body.Status,
                "Articles": [
                    {
                        "ID":"Identifiant de l'article seul"
                        "Qte":quantité de l'article (nombre)
                    }
                ],
                "Menus": [
                    {
                        "ID":"Identifiant du menu"
                        "Qte": quantité de l'article (nombre)
                    }
                ]
            }
            ```
          Address :
            ```json
            {
                "CP": Nombre (Code postal de l'adresse),
                "City": "Ville de l'adresse",
                "Street": "Rue et n° d'appartement / maison de l'adresse"
            }
            ```
          card :
            ```json
            {
              "Card_number" : Numér de carte
              "Owner" : "propriétaire dela carte"
              "cvc" : Numéro CVC de la carte
              "Exp_date" : "date d'expiration de la carte"
            }
            ```

 - ### [ GET ] '/read' :  
        Cette route permet à l'applicaiton frontend des clients de récupérer les informations de son compte, de ses commandes, de ses cartes ou encore de ses adresses.

        Données à mettre en header de la requete :
          Type :
            Order
            history
            Account
            card (en fonction d'un id de carte)
            adress (en fonction d'un id d'adresse)
            card_account (en fonctio d'un ID de compte)
            adress_accont (en fonction d'un ID de compte)
          ID :
            Identifiant du client, de l'adresse, ou de la carte

 - ### [ POST ] '/update' :
        Cette route permet à l'appliction frontend des clients d'émettre une demande de mise à jour d'informations du compte, de commande, d'adresse ou de carte bancaire.

        Données à mettre en header de la requete :
          Type :
            Order
            Account
            Addres
            Card
          ID :
            Identifiant du client, de la carte, de la commande ou de l'adresse à modifier
        
        Données à mettre en body de la requete en fonction du cas d'utilisation :
          Order :
            ```json
            {
                "ID_restaurant": ,
                "ID_delivery": ,
                "Total_price": ,
                "Number_products": ,
                "Status": body.Status,
                "Articles": [
                    {
                        "ID":"Identifiant de l'article seul"
                        "Qte":quantité de l'article (nombre)
                    }
                ],
                "Menus": [
                    {
                        "ID":"Identifiant du menu"
                        "Qte": quantité de l'article (nombre)
                    }
                ]
            }
            ```
          Address :
            ```json
            {
                "CP": Nombre (Code postal de l'adresse),
                "City": "Ville de l'adresse",
                "Street": "Rue et n° d'appartement / maison de l'adresse"
            }
            ```
          card :
            ```json
            {
              "Card_number" : Numér de carte
              "Owner" : "propriétaire dela carte"
              "cvc" : Numéro CVC de la carte
              "Exp_date" : "date d'expiration de la carte"
            }
            ```

 - ### [ POST ] '/delete' :
        Cette route permet à l'applicaiton frontend des clients de demander une suppression des informations de son compte, de ses commandes non validées / passées, de ses cartes ou encore de ses adresses.

        Données à mettre en header de la requete :
          Type :
            Order
            Account
            Card (en fonction d'un id de carte)
            Adress (en fonction d'un id d'adresse)
          ID :
            Identifiant du client, de l'adresse, ou de la carte


Last update : 10/04/2024 by Virgile NICOLAS