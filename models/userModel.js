
const Sequelize = require('sequelize');



const User = sequelize.define('user', {
    name : Sequelize.STRING,
    email : Sequelize.STRING,
    password : Sequelize.STRING
});