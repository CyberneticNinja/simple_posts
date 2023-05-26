const express = require('express');
const app = express();
const port = 3000;
const Blog = require('./models/blog')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const postController = require('./controllers/postController')
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const dbURI = process.env.CONNECTION_STRING

mongoose.connect(dbURI, {useUnifiedTopology: true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err))

app.get('/', (req, res) => {
    postController.showAllPosts(res)
})
app.get('/post/:id', (req, res) => {
    postController.showPost('post',req,res)
})

app.delete('/post/:id', (req, res) => {
    postController.deletePost(req.params.id,res)
})

app.get('/post/update/:id', (req, res) => {
    postController.showUpdatePostForm('update','UPDATE',req,res)
})
app.post('/post/update/:id', (req, res) => {
    postController.updatePost(req.params.id,req,res)
})
app.get('/posts/create', (req, res) => {
    postController.showCreatePostForm('create','create',res)
})

app.post('/posts/create', (req, res) => {
    postController.createPost(req,res)
})

app.listen(port)

console.log('listening on port ' + port)