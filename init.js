const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main().then(() => {
    console.log("connection successful!");
})
.catch(err => console.log(err));

let allChats = [
    {
        from: "neha",
        to: "priya",
        msg: "Send me your exam sheets",
        created_at: Date.now(), //UTC format
    },
    {
        from: "rohit",
        to: "mohit",
        msg:"teach me JS callbacks",
        created_at : Date.now(), //UTC format
    },
    {
        from: "amit",
        to: "sumit",
        msg: "Best of Luck",
        created_at: Date.now(), //UTC format
    },
    {
        from: "anita",
        to: "ramesh",
        msg: "bring me some fruits",
        created_at: Date.now(), //UTC format
    },
    {
        from:"tony",
        to: "peter",
        msg: "love you 300!",
        created_at: Date.now(), //UTC format
    },

];

Chat.insertMany(allChats);

