const express = require('express')

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH");
    next();
})

app.use('/api/posts',(req,res,next) => {
    const posts = [
    {
        id:'4631351',
        title:'Post 1',
        content:'This is post 1'
    },
    {
        id:'4631352',
        title:'Post 2',
        content:'This is post 2'
    }
    ]
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts: posts
    })
})

module.exports = app;