const clients = {
    restaurant: new Set(),
    client: new Set(),
    livreur: new Set(),
    intern: new Set(),
    tiers: new Set()
};

module.exports = {
    sendToCategory: function (category, message) {
        clients[category].forEach(client => {
            client.send(message);
        });
    },
    handleConnection: function (ws, category) {
        clients[category].add(ws);
    
        ws.on('close', function close() {
            clients[category].delete(ws);
        });
    
        ws.send('Welcome to the ' + category + ' category!');
    }
}