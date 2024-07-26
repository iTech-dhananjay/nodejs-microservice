import userModel from '../models/user.js';

const createUser = async (userData) => {
     try {
          const newUser = new userModel(userData);
          const createdUser = await newUser.save();
          return createdUser;
     } catch (error) {
          throw new Error('Error creating user: ' + error.message);
     }
};

const getUser = async () => {
     try {
          const users = await userModel.find();
          return users;
     } catch (error) {
          throw new Error('Unable to get users');
     }
};

const login = async (emailOrPhone, password) => {
     try {
          const isEmail = /\S+@\S+\.\S+/.test(emailOrPhone);

          const query = {
               password,
          };

          if (isEmail) {
               query.email = emailOrPhone;
          } else {
               query.phoneNumber = emailOrPhone;
          }

          const user = await userModel.findOne(query);

          if (!user) {
               throw new Error('User not found');
          }

          return user;
     } catch (error) {
          throw new Error('Login failed: ' + error.message);
     }
};

const isUserApproved = async (emailOrPhone) => {
     try {
          const isEmail = /\S+@\S+\.\S+/.test(emailOrPhone);

          const query = {
               isApproved: 'approved',
          };

          if (isEmail) {
               query.email = emailOrPhone;
          } else {
               query.phoneNumber = emailOrPhone;
          }

          const user = await userModel.findOne(query);
          return !!user;
     } catch (error) {
          throw new Error('User approval check failed: ' + error.message);
     }
};

export const userService = {
     createUser,
     login,
     getUser,
     isUserApproved,
};
