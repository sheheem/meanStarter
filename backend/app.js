const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Post = require('./model/post')

const app = express();

mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://shein100:zain1962@cluster0.rtht5yu.mongodb.net/socialMedia?retryWrites=true&w=majority').then(() => {
    console.log("Connection established");
}).catch((err) => {
    console.log("Connection failed: " + err);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH");
    next();
})







app.post('/api/posts', (req,res,next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save()
    res.status(201).json({
        message: 'Post added successfully'
    })
})

app.get('/api/posts',(req,res,next) => {
   Post.find().then((document) => {
       res.status(200).json({
           message: 'Posts fetched successfully',
           posts: document
       })
   })
})

module.exports = app;