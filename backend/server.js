const express = require('express');
const cors = require('cors');
const userModel = require('./models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PORT = 3000;

const JWT_SECRET = "ferifj2o3yr87uedwijdfn3847yehrit3g438ydjcsihf8374huhuhwhe7f8834ihiideir";

const app = express();

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {
    return res.status(200).send("Server");
})

app.post('/register',async(req,res) => {
    try {
        const { name,email,password } = req.body
        const userExist = await userModel.findOne({ email });

        if(userExist){
            return res.status(400).send({ error:"Email is already registered" });
        }
        const hashPassword = await bcrypt.hash(password,10);
        await userModel.create({
            name,
            email,
            password:hashPassword
        });
        return res.status(200).send({ data:"Registration successful" });

    } catch (error) {
        console.log(error);
    }
})


app.post('/login-user',async(req,res) => {
    try {
        const { email,password } = req.body
        const user = await userModel.findOne({ email });

        if(!user){
            return res.status(400).send({ error:"User Not Found" });
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(isPasswordValid){
            const token = jwt.sign(
                {
                    id:user._id,
                    name:user.name,
                    email:user.email,
                },
                JWT_SECRET,
                {
                    expiresIn:"7d"
                }
            );
            return res.status(200).json({ status:"ok",data:token });
        }
        else{
            return res.status(400).send({ error:"Password is incorrect" });
        }


    } catch (error) {
        console.log(error);
    }
})


app.listen(PORT,() => {
    console.log(`Server listening to port no ${PORT}`);
})

