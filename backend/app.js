const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')

const app = express();
const password = process.env.PASSWORD


mongoose.set('strictQuery', true)
mongoose.connect(`mongodb+srv://shein100:${password}@cluster0.rtht5yu.mongodb.net/socialMedia?retryWrites=true&w=majority`).then(() => {
    console.log("Connection established");
}).catch((err) => {
    console.log("Connection failed: " + err);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH");
    next();
})


app.use("/api/posts" ,postRoutes);
app.use("/api/user", userRoutes)

module.exports = app;  