const mysql = require('mysql2')
const express = require('express')
const app = express()
const port = 8000

const con = mysql.createConnection({
    host:'localhost',
    user:'your-username-mysql',
    password:'your-password-mysql',
    database : 'login'
})

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.post('/login',(req,res) => {
    const name = req.body.username
    const password = req.body.password
    con.query(`
        SELECT * FROM users WHERE username='${name}' AND password='${password}';
    `, (err,result) => {
        if(err){
            res.status(500).json({message:'Internal Server Eroor'})
        }else{
            if(!result[0]){
                res.status(404).json({message:'User not found'})
            }else{
                res.status(200).json({token : 'abcd'})
            }
        }
    })
})

app.listen(port, () => {
    con.connect((err) => {
        if(err){
            console.error(err)
        }else{
            console.log(`App running on ${port}`)
            console.log('connected' + con.threadId)
        }
    })
})