import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecom AWS Cloud API',
            version: '1.0.0',
            description: 'API documentation for the ecom-aws-cloud module',
        },
        servers: [
            {
                url: 'http://localhost:4009',
            },
        ],
    },
    apis: ['./src/modules/ecom-aws-cloud/router/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;