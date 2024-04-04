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
Livreurs : 3001  
restaurants : 3002  
interne : 3003  
dev tiers : 3004  

### Back-end :
Auth : 3020  
delivery : 3021  
intern : 3022  
restaurant : 3023  
third-party : 3024  
user : 3025  

# Normes d'écritures :
## Logs
Dans le cas ou noussuivons l'avancée de tous les logs en même temps, il faut que l'on soit capable de savoir quel service à log quelle ligne. C'est pourquoi nous allons définir une norme d'écriture des logs.  
Chaque log dans les console doit s'écrire comme suit : '[nom du service] log '
