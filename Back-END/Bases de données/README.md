# Bases de données

## Docker compose
Fichier de configuration de base des bases de données sous format conteneur  
Pour ce projet, nous utilisons MariaDB et MongoDB

### Configuration commmune aux services :
Redémarge automatique s'il y a un crash  
Réseau utilisé : serveur hôte  
Adresse de connexion : 213.32.6.121
Nom des bases de données : CESI_eats

### Configuration MariaDB
Nom de service : db-maria  
Image : mariaDB dernière version au 02/04/2024

### Configuration MongoDB
Nom de service : db-mongo  
Image : MongoDB dernière version au 02/04/2024

Last update : 05/04/2024 by Virgile NICOLAS
