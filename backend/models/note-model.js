const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Notes")
    .then(() => { console.log("Notes collection is connected with MongoDB"); })
    .catch((err) => { console.log(err); });

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

const noteModel = mongoose.model("Note", noteSchema);
module.exports = noteModel;
