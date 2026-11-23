const mongoose = require("mongoose");
const Chat = require("./models/chats.js");

main()
.then(() => {
    console.log("successful");
}).catch((err) => {
    console.log(err);
})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let allChats = [
    {
    from:"Yogesh",
    to:"Yug",
    message:"You are my hero",
    created_at: new Date()
},
{from:"Shardha",
    to:"Rohit",
    message:"Become successful",
    created_at: new Date()
},
{
    from:"Ajay",
    to:"Giri",
    message:"Earn money as much as possible",
    created_at: new Date()

},
{
    from:"Arun",
    to:"Didi",
    message:"Thank you",
    created_at: new Date()

},

]

Chat.insertMany(allChats);