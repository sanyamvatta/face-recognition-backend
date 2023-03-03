const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  // Enter your own database information here based on what you created
  client: 'pg',
  connection: {
    host : 'postgres://sanyam:XDXELXeRIr2htaEPVokq8v04wVPYdUP1@dpg-cg0ljd02qv2bfoqec9d0-a/smartbrains_2wof',
    user : 'sanyam',
    password : 'XDXELXeRIr2htaEPVokq8v04wVPYdUP1',
    database : 'smartbrains_2wof'
  }
});


const app = express();

app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

app.get('/',(req,res)=>{
  res.json('success')
})

app.post('/signin',(req,res)=>{signin(req,res,db,bcrypt)} )

app.post('/register',(req, res) =>{register(req,res,db,bcrypt)})

app.get('/profile/:id',  (req, res) =>{profile(req,res,db)})

app.put('/image', (req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})

const port = process.env.PORT || 5000
app.listen(port, ()=> {
  console.log('app is running on port 3000');
})
