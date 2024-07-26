import jwt from 'jsonwebtoken';

const isLoggedInAndAdmin = (req, res, next) => {
     try {
          const tokens = req.headers.authorization;

          if (!tokens) {
               return res
                    .status(401)
                    .json({ message: 'Unauthorized. Token missing.' });
          }

          const token = tokens.split(' ')[1];

          const decodedToken = jwt.verify(token, process.env.JWT_KEY);
          console.log('decodedToken', decodedToken);

          if (decodedToken.role === 'admin') {
               req.user = decodedToken; // Attach the decoded token to the request object
               next();
          } else {
               res.status(403).json({
                    message: 'Access denied. Admin role required.',
               });
          }
     } catch (error) {
          console.log(error);
          res.status(401).json({ message: 'Unauthorized. Invalid token.' });
     }
};

export default isLoggedInAndAdmin;
