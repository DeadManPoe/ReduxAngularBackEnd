const userModel = require('../models/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');

class UsersController{
    static post(req,res, next){
        userModel.findOne({
            email : req.body['email']
        },(err,user)=>{
            if(user){
                res.json({
                    success : false
                })
            }
            else {
                let user = new userModel();
                for(let key in req.body){
                    if(req.body.hasOwnProperty(key)){
                        user[key] = req.body[key];
                    }
                }
                let hash = crypto.createHash('sha256');
                hash.update(user.password);
                user.password = hash.digest('hex');
                user.save((err)=>{
                    let token = jwt.sign({
                        name : user.name,
                        email : user.email
                    },config.secret,{
                        //24 hours
                        expiresIn : 1440
                    });
                    res.json({success : true, token : token})
                })
            }
        });

    }
    static postAuthenticate(req,res,next){
        let email = req.body.email;
        userModel.findOne({
            email : email
        },{
            name : true,
            email : true,
            password : true
        },(err,user)=>{
            if(err){
                res.end(err);
            }
            if(!user){
                res.json({
                    success: false,
                })
            }
            else{
                let password = user.password;
                let hash = crypto.createHash('sha256');
                hash.update(req.body.password);
                if(hash.digest('hex') === password){
                    let token = jwt.sign({
                        name : user.name,
                        email : user.email
                    },config.secret,{
                        //24 hours
                        expiresIn : 1440
                    });
                    res.json({success : true, token : token})
                }
                else{
                    res.json({success : false})
                }
                next();
            }
        })
    }
}
module.exports = UsersController;