import { Router } from 'express';
import { userService } from '../services/user.js';
const router = Router();
import generateToken from '../../../middleware/token.js';
import dotenv from 'dotenv';
dotenv.config();

router.post('/register', async (req, res) => {
     try {
          const { firstName, lastName, email, password, role, isApproved } =
               req.body;

          const data = {
               firstName,
               lastName,
               email,
               password,
               role,
               isApproved,
          };

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
          const { emailOrPhone, password } = req.body;

          const isApproved = await userService.isUserApproved(emailOrPhone);

          if (!isApproved) {
               return res
                    .status(400)
                    .json({ message: 'User not approved by admin' });
          }

          const user = await userService.login(emailOrPhone, password);

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
          };

          return res.status(200).json(response);

          return res.status(200).json(response);

          return res.status(200).json(response);
     } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
     }
});

router.get('/list', async (req, res) => {
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
