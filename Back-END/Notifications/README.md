# Service de Notification

Ce micro service prend en charge les fonctionnalités relatives aux notifications. Elle permet de notifier les différents types d'utilisateurs en fonction des évènements mise en ligne sur les topics kafka.

## Configuration
Ce service agit en tant que websocket sur le port 3026.

## S'y connecter
Pour s'y connecter voici le code JS :

```JS
const webSocket = new WebSocket("ws://[host]:3026");

// Connection au websocket
webSocket.onopen = function(event) {
    // Envoie du topic qui nous interesse ici le typre utilisateur
    webSocket.send('restaurant');
};

// Pour chaque message recu du websocket
webSocket.onmessage = function(event) {
    //Notification avec le message disponnible dans event.data
};
```

## Les topics
Les différents topics seront découpés par type d'utilisateur pour simplifier leur gestion backend comme frontend.

|---|---|
|Topics|Utilisation|
|---|---|
|restaurants| |
|clients| |
|livreurs| |
|tiers| |
|intern| |



Last update : 10/04/2024 by MaximeCESI