import express from 'express';
import cors from 'cors';
import paymentGatewayModule from './modules/payment-gateway/index.js';
import videoStreamingModule from "./modules/video-image-stream/index.js";
import ecomModule from "./modules/ecom-aws-cloud/index.js";
import chatMessageModule from "./modules/websocket-chat-app/index.js";
import setupSwagger from "./config/swagger-doc.js";
import setupSwaggerReplica from "./config/replica-swagger-doc.js";
const app = express();
import path from "path";

// Use Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Setup Swagger
setupSwagger(app);
setupSwaggerReplica(app);

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/qrcodes', express.static(path.resolve('public/qrcodes')));

// Initialize the modules with the app instance
paymentGatewayModule.init(app);
videoStreamingModule.init(app);
ecomModule.init(app);
chatMessageModule.init(app);


// Route to get the API key
app.get('/api/getkey', (req, res) => {
    const apiKey = process.env.RAZORPAY_API_KEY;
    if (apiKey) {
        res.status(200).json({ key: apiKey });
    } else {
        res.status(500).json({ error: 'API key not found' });
    }
});

export default app;