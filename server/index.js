require("dotenv").config()
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const {crateFolder}= require('./functions/fs.functions')
require('./DL/database').connect()

app.use(express.json());
app.use(cors());

const maineRouter = require('./router/main.router')
maineRouter(app)
// crateFolder("public")
// const root = "./public/root"
// crateFolder(root)
// crateFolder(`./public/temp`)
app.use('', express.static(path.join(__dirname, './public/dist')))
app.get("/*",(req , res ) =>{
    res.sendFile('/')
})

app.listen(8080, () => (console.log('Server listening 8080')));



