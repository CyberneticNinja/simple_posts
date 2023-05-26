const Blog = require("../models/blog");

const showAllPosts = (res) => {
    Blog.find()
        .then((result) => {
            res.render('index', {title: 'Home', blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
}

const showUpdatePostForm = function (target, title, req, res) {
    Blog.findOne({_id: req.params.id})
        .then((result) => {
            res.render(target, {title: title + result.title, blog: result})
        })
        .catch((err) => {
            console.log(err)
        })
}

const updatePost = (id, req, res) => {
    const updateData = {
        title: req.body.title,
        description: req.body.description,
        body: req.body.body
    };

    Blog.updateOne({_id: req.params.id}, updateData)
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => {
            console.error('Error updating document:', error);
        });
}

const deletePost = (id, res) => {
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/'})
        })
}

const createPost = (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        body: req.body.body
    })

    blog.save()
        .then((result) => {
            res.redirect('/');
        })
}

const showPost = (target, req, res) => {
    Blog.findOne({_id: req.params.id})
        .then((result) => {
            res.render(target, {title: result.title, blog: result})
        })
        .catch((err) => {
            console.log(err)
        })
}

const showCreatePostForm = function (target, title, res) {
    res.render(target, {title: title})
}

module.exports = {showAllPosts, updatePost, deletePost, createPost, showCreatePostForm, showUpdatePostForm, showPost}