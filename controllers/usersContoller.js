const userModel = require('../models/user');
const crypto = require('crypto');

class UsersController{
    static post(req,res){
        let user = new userModel();
        for(let key in req.body){
            if(req.body.hasOwnProperty(key)){
                user[key] = req.body[key];
            }
        }
        console.log(user);
        let hash = crypto.createHash('sha256');
        hash.update(user.password);
        user.password = hash.digest('hex');
        user.save((err)=>{
            if(err){
                res.end(err)
            }
            res.json({message : 'user created'})
        })
    }
    static postAuthenticate(req,res){
        let email = req.body.email;
        userModel.findOne({
            email : email
        },'password',(err,user)=>{
            if(err){
                res.end(err);
            }
            let password = user.password;
            let hash = crypto.createHash('sha256');
            hash.update(req.body.password);
            if(hash.digest('hex') === password){
                res.json({message : 'OK'})
            }
            else{
                res.json({message : 'NO'})
            }
        })
    }
}
module.exports = UsersController;