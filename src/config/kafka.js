import kafka from 'kafka-node';

const kafkaHost = process.env.KAFKA_HOST || 'localhost:9092';
const client = new kafka.KafkaClient({ kafkaHost });

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

createTopic(process.env.KAFKA_TOPIC); // Create the topic

export default client;
export { kafkaHost };