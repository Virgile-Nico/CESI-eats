# CESI-eats

# Ports :
## Plages de ports :
### Front-end :
3000 - 3019

### Back-end :
3020 - 3039

## Utilisés :

### Front-end : 
utilisateurs : 3000  
livreurs : 3001  
restaurants : 3002  
interne : 3003  
dev tiers : 3004  

### Back-end :
auth : 3020  
delivery : 3021  
intern : 3022  
restaurant : 3023  
third-party : 3024  
user : 3025  
notification : 3026  

### Bases de données
mariadb : 3306  
mongodb : 27017  

# Normes d'écritures :
## Logs

Dans le cas ou nous suivons l'avancée de tous les logs en même temps, il faut que l'on soit capable de savoir quel service à log quelle ligne. C'est pourquoi nous allons définir une norme d'écriture des logs.  

Chaque log dans les console doit s'écrire comme suit : '[nom du service] log '

Pour les logs d'actions, ils seront stockés en BDD NoSQL sous le format suivant :

```json
{
  "timestamp": "date courante sous format 'dd:MM:YYYY hh:mm:ss'"
  "service": "nomination du service rattaché à l'action loggée"
  "action_type": "type de l'action"
  "route": "route appelée"
  "success": "état de la requète"
  "message": "message complémentaire"
}
```

Last modification : Maxime MONZA 09/04/2024
