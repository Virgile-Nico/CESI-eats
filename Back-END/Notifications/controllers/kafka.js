const { Kafka } = require('kafkajs');
const websocketController = require('./websocket');
const logger = require('./logger');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['213.32.6.121:9092'] // Liste des brokers Kafka
});

const consumers = new Map();

module.exports = {
    createConsumer: async function (topic) {
        const consumer = kafka.consumer({ groupId: 'test-group' });

        // Connecter le consommateur au broker Kafka
        await consumer.connect();

        // S'abonner au topic
        await consumer.subscribe({ topic });

        // Ecouter les messages
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                logger.logaction('Send notification',topic,true,message.value.toString())
                // Envoi du message au WebSocket
                websocketController.sendToCategory(topic, message.value.toString());
            },
        });

        consumers.set(topic, consumer);
    },
}