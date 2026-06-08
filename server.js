const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection

mongoose.connect("mongodb://127.0.0.1:27017/ssscement")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Schema

const contactSchema = new mongoose.Schema({

    name: String,
    email: String,
    mobile: String,
    message: String

});

// Model

const Contact = mongoose.model("Contact", contactSchema);

// API

app.post("/contact", async (req, res) => {

    try {

        const newMessage = new Contact(req.body);

        await newMessage.save();

        res.json({
            success: true,
            message: "Message Saved Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Server

app.listen(5000, () => {

    console.log("Server Running On Port 5000");

});
