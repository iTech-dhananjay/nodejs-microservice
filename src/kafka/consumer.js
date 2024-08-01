import kafka from 'kafka-node';
import { kafkaHost, ensureTopicExists } from '../config/kafka.js';

const initConsumer = async () => {
    await ensureTopicExists(process.env.KAFKA_TOPIC);

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

    return consumer;
};

export default initConsumer;
