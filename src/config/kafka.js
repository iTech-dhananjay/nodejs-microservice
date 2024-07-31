import kafka from 'kafka-node';

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST || 'localhost:9092' });

const createTopic = (topicName) => {
    client.createTopics(
        [
            {
                topic: topicName,
                partitions: 1,
                replicationFactor: 1,
            },
        ],
        (error, result) => {
            if (error) {
                console.error('Error creating topic:', error);
            } else {
                console.log('Topic created:', result);
            }
        }
    );
};

createTopic('todo-topic'); // Create the topic

export const kafkaHost = process.env.KAFKA_HOST || 'localhost:9092';
export default client;