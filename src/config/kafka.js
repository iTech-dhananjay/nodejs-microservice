import kafka from 'kafka-node';

const kafkaHost = process.env.KAFKA_HOST || 'localhost:9092';
const client = new kafka.KafkaClient({ kafkaHost });

const createTopic = (topicName) => {
    return new Promise((resolve, reject) => {
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
                    reject(error);
                } else {
                    console.log('Topic created:', result);
                    resolve(result);
                }
            }
        );
    });
};

const ensureTopicExists = async (topicName) => {
    const topicsToCreate = [{ topic: topicName, partitions: 1, replicationFactor: 1 }];
    const admin = new kafka.Admin(client);
    admin.listTopics((err, res) => {
        if (err) {
            console.error('Error listing topics:', err);
        } else {
            const topics = Object.keys(res[1].metadata);
            if (!topics.includes(topicName)) {
                createTopic(topicName).then(() => {
                    console.log(`Topic ${topicName} is ready`);
                });
            } else {
                console.log(`Topic ${topicName} already exists`);
            }
        }
    });
};

ensureTopicExists(process.env.KAFKA_TOPIC);

export default client;
export { kafkaHost };