var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require ('pg').Pool;
var crypto=require('crypto');

var config= {
   user: "kslchn", 
   database: "kslchn",
   host: "db.hasura-app.io",
   port: "5432",
   password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

function createTemplate (data) {"*"}

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



app.get('/mudhal', function (req,res) {
 res.sendFile(path.join(__dirname, 'ui','mudhal.html'));
});
app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

  

app.get('/second', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'second.html'));
});

app.get('/articletwo',function (req,res){
   res.send('article two requested and will be served here');
});

app.get('/articlethree',function (req,res){
   res.send('article one requested and will be served three');
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
