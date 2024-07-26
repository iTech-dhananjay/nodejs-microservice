import jwt from 'jsonwebtoken';

const isLoggedIn = (req, res, next) => {
     try {
          const tokens = req.headers.authorization;

          if (!tokens) {
               return res
                    .status(401)
                    .json({ message: 'Unauthorized. Token missing.' });
          }

          const token = tokens.split(' ')[1];

          const decodedToken = jwt.verify(token, process.env.JWT_KEY);

          // Attach the decoded token to the request object
          req.user = decodedToken;
          next();
     } catch (error) {
          res.status(401).json({ message: 'Unauthorized. Invalid token.' });
     }
};

export default isLoggedIn;
