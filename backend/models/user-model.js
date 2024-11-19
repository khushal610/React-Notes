const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Notes')
.then(() => {console.log('MongoDB connection sucessful')})
.catch((err) => {console.log(err)})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});

const userModel = mongoose.model('User',userSchema);
module.exports = userModel;