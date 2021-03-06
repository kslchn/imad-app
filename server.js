var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require ('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');

var config= {
   user: "kslchn", 
   database: "kslchn",
   host: "db.hasura-app.io",
   port: "5432",
   password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

function createTemplate (data) { ` ` }

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash (input,salt) {
    
    var hashed=crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512'); 
    return ["pkdf2", 10000, salt,hashed.toString(hex)].join('$') ;
}

app.get('/ hash/; input',function (req, res) {
  var hashedString=hash(req.params.input,'this-is-some-random-string');
  res.send (hashedString);
});

app.post('/create-user', function(req, res){
    // username,password
    // {"username":"kslchn", "password": "password"}
    // JSON
    var username=req.body.username;
    var password=req.body.password;
    var salt= crypto.randomBytes(128). toString('hex');
    var dbString=hash(password,salt);
    pool.query ('INSERT INTO "user" (username,password) VALUES($1,$2)', [username,dbString], function(err,result){
        if (err){
           res.status(500).send(err.toString()); 
        }else{
            res.send('user successfully created' + username);
        }
    });
    
});

app.post('/login', function(req, res) {
    var username=req.body.username;
    var password=req.body.password;
    
    pool.query ('SELECT * FROM "user" WHERE username=$1', [username], function(err,result){
        if (err){
           res.status(500).send(err.toString()); 
           
        }else{
            if (result, rows, length === 0){
                res.send(403).send('username/password is invalid');
                
         }else {
                    var dbString = result. rows[0] . password;
                    var salt= dbString. split('$')[2];
                    var hashedPassword=hash(password,salt);
                    if (hashedPassword===dbString){
            res.send('credentials correct');
                    }else{
                res.send(403).send('username/password is invalid');
                    }
         }        
        }
    }); 
});



app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','article-one.html'));
});

app.get('/mudhal', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui','mudhal.html'));
});

  

app.get('/articletwo',function (req, res){
   res.send('article two requested and will be served here');
});

app.get('/articlethree',function (req, res){
   res.send('article three requested and will be served here');
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
