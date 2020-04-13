require('dotenv/config');

const jwt =  require('jsonwebtoken');

module.exports = {
   async token(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({ message: "Token não fornecido"});
    }
    const [, token] = authHeader.split(' ');


    try {
        const payload = jwt.verify(token, process.env.APP_SECRET);

        req.userId = payload.userId;

        return next();
    } catch (error) {
        return res.status(401).json({ message: "Token Inválido" });
    }
   }
}