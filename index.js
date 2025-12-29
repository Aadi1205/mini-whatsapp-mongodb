const express = require('express');
const app = express();
const Chat = require('./models/chat.js');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

//for ejs
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//for css styling
app.use(express.static(path.join(__dirname, '/public')));
//for forms to encode the data from POST req
app.use(express.urlencoded({extended: true}));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main().then(() => {
    console.log("connection successful!");
})
.catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('working root');
});

//Index Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render('index.ejs', {chats});
});

//New Route
app.get("/chats/new", (req, res) => {
    res.render('new.ejs');
});

//Create Route
//we can't use .then() and async function together
app.post("/chats", (req, res) => {
    let {from, to, msg} = req.body;
    let newChat = new Chat({
        from: from, 
        to:to, 
        msg: msg,
        created_at: new Date()
    });
    newChat.save().then((res) => {console.log("chat was saved");}).catch((err) => {console.log(err)});
    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render('edit.ejs', {chat});
});

//Update Route
app.put("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let {msg} = req.body;
    console.log(msg);
    let chat = await Chat.findByIdAndUpdate(id, {msg}, {new: true, runValidators: true});
    res.redirect("/chats");
});

//Delete/ Destroy Route
app.delete("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});


app.listen(8080, () => {
    console.log("listening on port: 8080")
});