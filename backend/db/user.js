const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
   
    phone:Number,
   
    college:String,
    job:String
})

module.exports = mongoose.model('users',userSchema);


