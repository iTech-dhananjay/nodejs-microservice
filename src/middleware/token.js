import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from a .env file

const generateToken = ({ userId, role, email, permissions }) => {
     try {
          // Token payload
          const payload = { userId, role, email, permissions };

          // Token options
          const options = {
               expiresIn: process.env.JWT_EXPIRES_IN || '1d', // Token expiration time, default to 1 day
               audience: process.env.JWT_AUDIENCE, // Optional: Audience for the token
               issuer: process.env.JWT_ISSUER, // Optional: Issuer of the token
          };

          // Generate the JWT token
          const token = jwt.sign(
              payload,
              process.env.JWT_KEY,
              options
          );

          return token;
     } catch (error) {
          console.error('Error generating JWT token:', error);
          throw new Error('Could not generate token');
     }
};

export default generateToken;