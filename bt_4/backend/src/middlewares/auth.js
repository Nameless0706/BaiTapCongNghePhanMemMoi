require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const white_lists =  ['/', '/login', '/register'];

    if(white_lists.find(item => '/v1/api' + item === req.originalUrl)){
        console.log('>>> White list: ', req.originalUrl);
        next();
    }

    else{


        if(req?.headers?.authorization.split(' ')?.[1]){
            const token = req.headers.authorization.split(' ')[1];

            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = {
                    email: decoded.email,
                    name: decoded.name,
                    createdBy: "thangHuynh"
                }

                console.log('>>> decoded: ', decoded);
                next();
            }

            catch(error){
                console.log('>>> Error verify token: ', error);
                return res.status(401).json({
                    message: 'Invalid token'
                });

            }
        }
        
        else{
            return res.status(401).json({
                message: 'No token provided'
            });
        }


    }
}

module.exports = auth;