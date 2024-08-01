import kafka from 'kafka-node';
import { kafkaHost } from '../config/kafka.js';

const client = new kafka.KafkaClient({ kafkaHost });
const consumer = new kafka.Consumer(
    client,
    [{ topic: process.env.KAFKA_TOPIC, partition: 0 }],
    { autoCommit: true }
);

consumer.on('message', (message) => {
    console.log('Kafka Consumer message:', message.value);
});

consumer.on('error', (err) => {
    console.error('Kafka Consumer error:', err);
});

export default consumer;