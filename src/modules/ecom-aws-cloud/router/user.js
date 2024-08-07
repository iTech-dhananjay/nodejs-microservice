import { Router } from 'express';
import { userService } from '../services/user.js';
const router = Router();
import generateToken from '../../../middleware/token.js';
import UAParser from 'ua-parser-js';
import { generalLimiter , loginLimiter, adminLimiter } from "../../../config/rateLimiter.js";
import dotenv from 'dotenv';
import { uploadImageToS3 } from "../../../aws/s3.js";
import fs from 'fs';
import { upload } from '../../../config/fileUpload.js'
dotenv.config();

router.post('/register', upload.single('profileImage'), async (req, res) => {
     try {
          const { firstName, lastName, email, password, role, isApproved } = req.body;

          // Handle the profile image upload
          let profilePictureUrl = null;
          if (req.file) {
               // Upload image to S3
               const filePath = req.file.path;
               const fileBuffer = fs.readFileSync(filePath);
               const fileType = req.file.mimetype.split('/')[1];
               profilePictureUrl = await uploadImageToS3(fileBuffer, fileType);
          }

          const data = { firstName, lastName, email, password, role, isApproved, profilePicture: profilePictureUrl };

          const user = await userService.createUser(data);

          res.status(201).send({
               success: true,
               data: user,
          });
     } catch (error) {
          console.error(error);
          res.status(500).json({
               success: false,
               error: 'Internal server error',
          });
     }
});

router.post('/login', async (req, res) => {
     try {
          const parser = new UAParser();
          const userAgent = req.get('User-Agent') || "";
          const device = parser.setUA(userAgent).getDevice();
          const deviceInfo = device.vendor ? `${device.vendor} ${device.model}` : "Unknown Device";
          const { emailOrPhone, password } = req.body;

          const sessions = {
               ipAddress: req.ip,
               device: deviceInfo,
               location: req.body.location, // Pass location from the client or use a geo-location service
               createdAt: new Date(),
          }

          const isApproved = await userService.isUserApproved(emailOrPhone);

          if (!isApproved) {
               return res
                    .status(400)
                    .json({ message: 'User not approved by admin' });
          }

          const user = await userService.login(emailOrPhone, password, [sessions]);

          if (!user) {
               return res.status(401).json({ message: 'Login failed' });
          }

          const response = {
               message: 'Login successful',
               firstName: user.firstName,
               lastName: user.lastName,
               isApproved: user.isApproved,
               role: user.role,
               token: generateToken({
                    userId: user._id,
                    role: user.role,
               }),
               sessions
          };

          return res.status(200).json(response);
     } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
     }
});

router.get('/list', generalLimiter, async (req, res) => {
     try {
          const users = await userService.getUser();

          return res.status(200).json({
               success: true,
               users,
          });
     } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Unable to get users' });
     }
});

export default router;
