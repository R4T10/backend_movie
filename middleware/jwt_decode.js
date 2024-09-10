const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.join(__dirname, '../.env');

const generateJWTKey = () => {
  return crypto.randomBytes(64).toString('hex');
};
const addJWTKeyToEnv = () => {
    const jwtKey = `JWT_KEY=${generateJWTKey()}\n`;
  
    try {
      if (!fs.existsSync(envPath)) {
        fs.writeFileSync(envPath, jwtKey);
      } else {
        const envFileContent = fs.readFileSync(envPath, 'utf-8');
        if (!envFileContent.includes('JWT_KEY=')) {
          fs.appendFileSync(envPath, jwtKey);
        }
      }
  
      process.env.JWT_KEY = jwtKey.split('=')[1].trim();
    } catch (error) {
      console.error('Error handling .env file:', error);
    }
  };
  
if (!process.env.JWT_KEY) {
  addJWTKeyToEnv();
}
module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split("Bearer ")[1];
        const decode = jwt.verify(token,process.env.JWT_KEY);
        req.auth = decode;
        return next();
    }catch (error){
        return res.status(401).json({
            message: 'Auth failed',
        })
    }
}