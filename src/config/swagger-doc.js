import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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
            },
        },
        paths: {
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
        },
    },
    apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
