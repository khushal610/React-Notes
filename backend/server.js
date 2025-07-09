const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PORT = 3000;

const userModel = require('./models/user-model');
const noteModel = require('./models/note-model');

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


app.post('/get-current-user',async(req,res) => {
    try {
        const {email} = req.body
        const checkUserExist = await userModel.findOne({ email });

        if(!checkUserExist){
            return res.status(400).send({ error:"User not found" });
        }
        return res.status(200).send({ data:checkUserExist });
    } catch (error) {
        console.log(error);
    }
})


app.post('/create-new-note', async (req, res) => {
    try {
        const { title, description, id } = req.body;

        if (!title || !description || !id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const note = new noteModel({
            title,
            description,
            user: id 
        });

        const savedNote = await note.save();
        res.status(201).json({ status: "ok", data: savedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});

app.post('/user-specific-notes',async(req,res) => {
    try {
        const {id} = req.body
        const getNotes = await noteModel.find({ user:id });

        if(!getNotes){
            return res.status(404).send({ error:"Notes not found" });
        }
        return res.status(200).send({ data:getNotes });
    } catch (error) {
        console.log(error);
    }
});


app.post('/delete-user-notes',async(req,res) => {
    try {
        const {noteID} = req.body
        const deleteNote = await noteModel.deleteOne({ _id:noteID });
        if(!deleteNote){
            return res.status(400).send({ error:"Note not found" });
        }
        return res.status(200).send({ data:"note deleted",status:"ok" });
    } catch (error) {
        console.log(error);
    }
});

app.post('/update-user-notes',async(req,res) => {
    try {
        const { noteID,title,description } = req.body
        const updateNote = await noteModel.updateOne({ _id:noteID },{$set:{title,description}});
        if(!updateNote){
            return res.status(400).send({ error:"Note not found" });
        }
        return res.status(200).send({ data:"note updated",status:"ok" });
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT,() => {
    console.log(`Server listening to port no ${PORT}`);
})

