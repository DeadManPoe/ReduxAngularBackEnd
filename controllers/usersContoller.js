const userModel = require('../models/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');

class UsersController{
    static post(req,res){
        userModel.findOne({
            email : email.req.body['email']
        });
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
            if(err){
                res.end(err)
            }
            res.end();
        })
    }
    static postAuthenticate(req,res){
        let email = req.body.email;
        userModel.findOne({
            email : email
        },{
            name : 1,
            email : 1,
            password : 1
        },(err,user)=>{
            if(err){
                res.end(err);
            }
            if(!user){
                res.json({
                    success: false,
                })
            }
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
        })
    }
}
module.exports = UsersController;