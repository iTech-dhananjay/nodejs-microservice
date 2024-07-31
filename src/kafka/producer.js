import kafka from 'kafka-node';
import { kafkaHost } from '../config/kafka.js';

const client = new kafka.KafkaClient({ kafkaHost });
const producer = new kafka.Producer(client);

producer.on('ready', () => {
    console.log('Kafka Producer is ready');
});

producer.on('error', (err) => {
    console.error('Kafka Producer error:', err);
});

const sendMessage = (topic, message) => {
    return new Promise((resolve, reject) => {
        producer.send([{ topic, messages: [message] }], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

export { sendMessage };