const { Kafka } = require('kafkajs');

// Configuration du client Kafka
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['213.32.6.121:9092'] // Liste des brokers Kafka
});

// Création du producteur Kafka
const producer = kafka.producer();

module.exports = {
    // Fonction pour envoyer un message
    sendMessage: async function (topic, message) {
        await producer.send({
        topic: topic,
        messages: [
            { value: message }
        ]
        });
    },
    // Connecter le producteur au broker Kafka
    connectProducer: async function () {
        await producer.connect();
        console.log('Producteur Kafka connecté !');
    }
}
