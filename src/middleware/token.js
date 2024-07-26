import jwt from 'jsonwebtoken';

const generateToken = (user) => {
     const token = jwt.sign(
          { userId: user.userId, role: user.role },
          process.env.JWT_KEY,
          { expiresIn: '1d' } // Token expires after 1 day
     );

     return token;
};

export default generateToken;
