const express = require('express')
const {handleGreeting} = require('./greeting')
const jwt = require("jsonwebtoken");
const app = express()
const port = 3001 
const MY_SECRET_KEY = "TOPSECRET"
const bodyParser = require("body-parser")

app.use(bodyParser.json());

const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    console.log(authorization)
    if (authorization) {
        try{
            jwt.verify(authorization.replace('Bearer ', ''), MY_SECRET_KEY)
            next()
        } catch(e) {
            res.send("invalid token")
        }
    }
    res.send("no token")
}

const findUser = (username, password) => {
    if(username ==='admin' && password === 'admin')
    return {
        username
    }
    return null; 
}

app.get("/", (request, response) => {
    response.send("Hello world")
})

app.get("/hello", authMiddleware, (request, response) => {
    handleGreeting(request, response)
})

app.get("/hello/:name?", authMiddleware, (request, response) => {
    handleGreeting(request, response)
})

app.post("/login", (req, res) => {
    const body = req.body
    const username = body.username
    const password = body.password

    if(findUser(username, password)) {
        const jwtResponse = jwt.sign({}, MY_SECRET_KEY)
        res.send({
            jwtResponse,
        });
    } else {
        res.status(401).send({
            jwtResponse:null,
        });
    }
})

app.listen(port, () => {
    console.log("started on port")
})