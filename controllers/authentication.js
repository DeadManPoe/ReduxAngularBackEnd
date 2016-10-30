const jwt = require('jsonwebtoken');
const config = require('../config');


const throw403 = (res)=>{
    res.status(403).send();
};

const authenticate = (req, res, next)=> {
    let token = req.headers['x-access-token'];
    if(token){
        jwt.verify(token,config.secret,(err,decoded)=>{
            if(err){
                throw403(res);
            }
            else {
                next();
            }
        })
    }
    else{
        throw403(res);
    }

};

module.exports = authenticate;