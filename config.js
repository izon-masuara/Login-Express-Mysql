const mysql = require('mysql2')
const con = mysql.createConnection({
    host:'localhost',
    user:'your-username-mysql',
    password:'your-password-mysql',
})

con.query(`
    CREATE DATABASE login;
`,(err,result) => {
    if(err){
        console.log(err)
    }else{
        console.log(result)
    }
})

con.query('use login')

con.query(`
    CREATE TABLE users(
        user_id INT NOT NULL,
        username VARCHAR(50) UNIQUE,
        password VARCHAR(30)
    );
`)

con.query(`
    INSERT INTO users 
        (user_id,username,password)
    VALUES 
        (1,"ucok","123"),
        (2,"izon","345");
`)

con.connect((err) => {
    if(err){
        console.error(err)
    }else{
        console.log('connected' + con.threadId)
    }
})

con.end()