const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    console.log(`authHeader-->${req.headers.Authorization}`);
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1];

        if(!token) {
            console.log('Token not provided');
            return res.status(401).json({
                message: 'Access Denied! Token not provided'
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log(`decoded user-->${req.user}`);
            next();
        } catch (error) {
            res.status(401).json({
                message: 'Access Denied! Invalid token'
            });
        }
    } else {
        res.status(401).json({
            message: 'Access Denied! No token'
        });
    }
}


module.exports = verifyToken;