import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
   
    const token = req.cookies.token;

    if (!token) {
     
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   ;
    
    if(!decoded) {
      return res.status(401).json({error: "Invalid token."});
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
   
    res.status(401).json({ error: "Invalid token." });
  }
};

export default isAuthenticated;