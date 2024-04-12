const { WebSocketServer } = require('ws');
const websocketController = require('./controllers/websocket');
const kafkaController = require('./controllers/kafka');
const { connectToMongoDB } = require('./controllers/dbMongo');

async function main() {
    await kafkaController.createConsumer('restaurant');
    await kafkaController.createConsumer('client');
    await kafkaController.createConsumer('livreur');
    await kafkaController.createConsumer('intern');
    await kafkaController.createConsumer('tiers');

    const wss = new WebSocketServer({ port: 3026 });

    wss.on("open", function open() {
        console.log("open action");
    });

    wss.on('connection', async function connection(ws) {
        ws.on('error', console.error);

        ws.once('message', function categoryMessage(category) {
            websocketController.handleConnection(ws, category);
        });
    });
}

connectToMongoDB()
  .then(() => {
    main();
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
