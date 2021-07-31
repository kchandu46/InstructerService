"use strict";
const expres = require('express');
const cors = require('cors');
const { LoginController } = require('./loginCtrl');
const {PostsController } = require('./postCtrl');
const app = expres();

// middleware, authentication and autherization should happen here
app.use(expres.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

const loginCtrl= new LoginController();

const postCtrl= new PostsController();
const publicRoutes=['/login','/posts'];
const privateRoutes=['/post', '/post/:id'];

app.use(varifyroute);

function varifyroute(req, res, next){
    console.log(req.url);
    if(privateRoutes.includes(req.url)){
        loginCtrl.asyncauthenticateToken(req,res,next);
    }else{
        next();
    }
}


app.post('/login', async (req, res, next) => {

    try {
        const data = await loginCtrl.handleLogin(req);
    
        res.status(200).json(data);

    } catch (err) {
        console.log('interanl user ' + err);

        if(err == 'Unathorized')  {
            res.status(401).json(data);
        } else{
            res.status(500).send(JSON.stringify(err));
        }

    }
});



app.post('/post', async (req, res, next) => {

    console.log('create')

    try {
        const data = await postCtrl.createPost(req.body);
        res.status(201).json(data);
    } catch (err) {
        console.log('error create ' + err);
        res.status(500).send(JSON.stringify(err));
    }
});


app.put('/post', async (req, res, next) => {
    console.log('UPdate')
    try {

        console.log(req.body)
        const data = await postCtrl.updatePost(req.body);
        res.status(201).json(data);
    } catch (err) {
        console.log('error create ' + err);
        res.status(500).send(JSON.stringify(err));
    }
});

app.delete('/post/:id', async (req, res, next) => {

    try {
        console.log(req);
        const data = await postCtrl.deletePost(req.params.id);
        res.status(201).json(data);
    } catch (err) {
        console.log('error create ' + err);
        res.status(500).send(JSON.stringify(err));
    }
});



app.get('/posts', async (req, res, next) => {

    try {
        const data = await postCtrl.getPosts(req.query);
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(JSON.stringify(err));
    }

});



app.listen(8080, () => {
    console.log('Server listening on 8080')
})

module.exports = app;
