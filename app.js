const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

var Schema =mongoose.Schema
var UserSchema = new Schema({
    username :{
        type:String,
        unique: true,
        require: true,
        minlength:6
    },
    password :{
        type:String,
        require: true,
        minlength:6
    },
    firstname :{
        type:String,
        require: true
    },
    lastname : {
        type:String,
        require: true
    },
    email : {
        type:String,
        require: true
    },
    sex : {
        type:Boolean,
        require: true
    },
    address : {
        type:String,
        require: true,
        minlength:3
    }
})

var User = mongoose.model('User',UserSchema)

mongoose.connect('mongodb://localhost:27017/UserDB').then((doc)=>{
    console.log('success')
}, (err) =>{
    console.log('fail')
})

var app = express()
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('hello')

})

app.post('/signup' , (req,res) =>{
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        sex: req.body.sex,
        address: req.body.address
    })

    newUser.save().then((doc) =>{
        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })

})

app.get('/signin',(req,res) =>{
   let usernameInput =  req.headers['username']
   let passwordInput = req.headers['password']
//find หาusername password สำหรับ login
   User.find({
       username: usernameInput,
       password: passwordInput        
   }).then((user) =>{
       if(user.length == 1 ){
        res.send(user[0])
       }else if(user.length ==0){
            res.status(400).send('sory not found is user')
       }
   },(err) =>{
        res.status(400).send(err)
   })
})


app.listen(3000 , () =>{
    console.log('is listen port 3000')
})