# Service de livraison

Ce micro service prend en charge les fonctionnalités relatives aux livreurs. Il permet aux livreurs de gérer leurs comptes, d'accepter ou de refuser des livraisons, de suivre et de valider les livraisons en temps réel, ainsi que de recevoir des notifications.  

## Routes
  - ### [ GET ] '/delivery-boy?id='
    Cette route permet la récupération des informations d'un livreur

  - ### [ POST ] '/delivery-boy'
    Cette route permet la modification des informations d'un livreur
    ```JSON
      {
        "mail":"email du livreur",
        "nom":"nom du livreur",
        "prenom":"prenom du livreur",
        "rib":"RIB du livreur",
        "vehicule_type":"type du vehicule du livreur"
      }
    ```

  - ### [ DELETE ] '/delivery-boy/?id='
    Cette route permet la suppression du compte d'un livreur


  - ### [ UPDATE ] '/delivery/?id='
    #### TO DO

  - ### [ GET ] '/delivery/?filter='
    #### TO DO



Last update : 09/04/2024 by MaximeCESI