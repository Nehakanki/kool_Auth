const express = require('express');
const app = express();

//to excess env contents
require('dotenv').config();

//define Port
 PORT = process.env.PORT || 4000


//middle ware to parse json

app.use(express.json());

//connecting to DB
const ConnectDb = require('./Config/database');
ConnectDb();

//route Setup

const Auth_route = require('./Routes/auth_route')

app.use("/api/v1",Auth_route);

app.listen(PORT, ()=>{
    console.log(`App started at Port : ${PORT}`);
})