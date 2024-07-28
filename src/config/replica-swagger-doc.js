import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {logServer} from "../utils/logger.js";

const productSchemas = {
    Product: {
        type: 'object',
        required: ['name', 'price', 'availableStock'],
        properties: {
            name: {
                type: 'string',
                description: 'The name of the product',
            },
            price: {
                type: 'number',
                description: 'The price of the product',
            },
            availableStock: {
                type: 'number',
                description: 'The available stock of the product',
            },
        },
        example: {
            name: 'Sample Product',
            price: 9.99,
            availableStock: 100,
        },
    },
};

const orderSchemas = {
    Order: {
        type: 'object',
        required: ['productId', 'quantity'],
        properties: {
            id: {
                type: 'string',
                description: 'The auto-generated id of the order',
            },
            productId: {
                type: 'string',
                description: 'The ID of the product',
            },
            quantity: {
                type: 'number',
                description: 'The quantity of the product ordered',
            },
        },
        example: {
            id: 'd5fE_asz',
            productId: '12345',
            quantity: 2,
        },
    },
};

const userSchemas = {
    User: {
        type: 'object',
        required: ['username', 'email'],
        properties: {
            id: {
                type: 'string',
                description: 'The auto-generated id of the user',
            },
            username: {
                type: 'string',
                description: 'The username of the user',
            },
            email: {
                type: 'string',
                description: 'The email of the user',
            },
        },
        example: {
            id: 'd5fE_asz',
            username: 'johndoe',
            email: 'johndoe@example.com',
        },
    },
};

const warehouseSchemas = {
    Warehouse: {
        type: 'object',
        required: ['location'],
        properties: {
            id: {
                type: 'string',
                description: 'The auto-generated id of the warehouse',
            },
            location: {
                type: 'string',
                description: 'The location of the warehouse',
            },
        },
        example: {
            id: 'd5fE_asz',
            location: '123 Main St',
        },
    },
};

const paymentSchemas = {
    Payment: {
        type: 'object',
        required: ['amount', 'currency', 'paymentIntentId', 'status'],
        properties: {
            id: {
                type: 'string',
                description: 'The auto-generated id of the payment',
            },
            amount: {
                type: 'number',
                description: 'The amount of the payment',
            },
            currency: {
                type: 'string',
                description: 'The currency of the payment',
            },
            paymentIntentId: {
                type: 'string',
                description: 'The Stripe payment intent ID',
            },
            productId: {
                type: 'string',
                description: 'The ID of the product',
            },
            userId: {
                type: 'string',
                description: 'The ID of the user',
            },
            status: {
                type: 'string',
                description: 'The status of the payment',
            },
            createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'The date and time when the payment was created',
            },
        },
        example: {
            id: 'd5fE_asz',
            amount: 5000,
            currency: 'usd',
            paymentIntentId: 'pi_1JY7X02eZvKYlo2C0hI8vBfF',
            status: 'succeeded',
            createdAt: '2023-07-28T12:34:56Z',
        },
    }
}

const productPaths = {
    '/ecom/product/add': {
        post: {
            tags: ['Product'],
            summary: 'Create a new product',
            security: [
                {
                    bearerAuth: [],
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Product',
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Product created successfully',
                },
                401: {
                    description: 'Unauthorized. Token missing.',
                },
            },
        },
    },
    '/ecom/product/list': {
        get: {
            tags: ['Product'],
            summary: 'Get product list',
            responses: {
                200: {
                    description: 'List of products',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Product',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const orderPaths = {
    '/ecom/order/list': {
        get: {
            tags: ['Order'],
            summary: 'Get order list',
            responses: {
                200: {
                    description: 'List of orders',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Order',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const userPaths = {
    '/ecom/user/list': {
        get: {
            tags: ['User'],
            summary: 'Get user list',
            responses: {
                200: {
                    description: 'List of users',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const warehousePaths = {
    '/ecom/warehouse/list': {
        get: {
            tags: ['Warehouse'],
            summary: 'Get warehouse list',
            responses: {
                200: {
                    description: 'List of warehouses',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Warehouse',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

const paymentPaths = {
    '/ecom/stripe-payment/create-payment-intent': {
        post: {
            tags: ['Payment'],
            summary: 'Create a payment intent',
            requestBody: {
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/PaymentIntent',
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Payment intent created',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    clientSecret: {
                                        type: 'string',
                                        description: 'The client secret for the payment intent',
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: 'Internal server error',
                },
            },
        },
    }
}

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
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                ...productSchemas,
                ...orderSchemas,
                ...userSchemas,
                ...warehouseSchemas,
                ...paymentSchemas
            },
        },
        paths: {
            ...productPaths,
            ...orderPaths,
            ...userPaths,
            ...warehousePaths,
            ...paymentPaths,
        },
    },
    apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerReplica = (app) => {
    app.use('/api-docs-replica', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    logServer('Swagger Replica API documentation is set up at http://localhost:4009/api-docs-replica');
};

export default setupSwaggerReplica;