const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const { error } = require("console");
const methodOverride = require("method-override");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main()
.then(() => {
    console.log("successful");
}).catch((err) => {
    console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

const port = 8080;



app.get("/chats", async (req,res) => {
    let chatas = await Chat.find();
    // console.log(chatas);
    res.render("index.ejs",{chatas});
    
})

//create new chat
app.get("/chats/new", (req,res) => {
    res.render("form.ejs");  
})

//get request
app.post("/chats", (req,res) => {
    let {from, message, to} = req.body;
    let newChat = new Chat ({
        from: from,
        message: message,
        to: to,
        created_at: new Date()
    });
    newChat.save()
    .then((res) => {
        console.log("chat was saved");
    })
    .catch((err) => {
        console.log(err);
    });
    res.redirect("/chats");
    
})

// Edit Route 

app.get("/chats/:id/edit", async (req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});  
})

//Update Route
app.put("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    console.log(newMsg)
    let updatedChat = await Chat.findByIdAndUpdate(id, {message:newMsg},{runValidators:true, returnDocument: 'after'});
    console.log(updatedChat);
    res.redirect("/chats");
})

//Destroy Route
app.delete("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats");
})

app.get("/", (req,res) => {
    res.send("it is working");
})

app.listen(port, ()=> {
    console.log("port is working");
})

