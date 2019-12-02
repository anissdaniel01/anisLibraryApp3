var express= require("express");// variable set
var bodyparser = require("body-parser");
var chalk = require("chalk")// to change color require chalk
var path = require("path");
var app= new express();// app function provided
var nav=[{link:'/books',title:'Books'},{link:'/authors',title:'Authors'},
        {link:'/books/addbooks',title:'Add Books'},{link:'/books/delebook', title:'DELETE BOOK'}];


var booksRouter = require('./src/routes/BokksRouter')(nav);
var authorsRouter = require('./src/routes/AuthorsRouter')(nav);
app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyparser.urlencoded({extented: true}));
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.set('views','./src/views');
app.set('view engine','ejs');
app.get("/",function(req,res){
 
res.render('index.ejs',{nav,title:"Library"});// ejs added fo give data
});
    

app.get("/login",function(req,res){
    res.render("login.ejs",{title:"Log In"});
});
app.get("/signup",function(req,res){
    res.render("signup.ejs",{title:"Sign up"});
});
app.get("/authors",function(req,res){
    res.render("authors.ejs",{nav,title:"Authors"});// when type localhost:3000/library get the haii everyone
});

var accounts=[];

    app.get('/accounts/login',(req,res)=>{
        res.render("login.ejs",{title:'LOGIN'});
    })

    app.get('/accounts/signup',(req,res)=>{
        res.render('signup.ejs',{title:'SIGN UP'})
    })

    app.post('/accounts/validate-login',(req,res)=>{
        var flag =-1;
        var login = req.body;
        console.log(login);
        
        for(var i=0;i<accounts.length;i++){
            if(login.username == accounts[i].username && login.password == accounts[i].password){
                res.send("Logged into "+accounts[i].username);
               
                flag = 0;
                console.log(flag+" = flag")
                
            }
        }
         if(flag == -1){
            res.send("Error, No such user");        }    
    })

    app.post('/accounts/validate-signup',(req,res)=>{
        var details = req.body;
        if(details.password == details.re_password){
            accounts.push(details);
        }
        
        console.log(accounts);
        console.log(accounts.length);
        res.render("index.ejs",{nav,title:'Library Management System'})
    })
app.listen(3000,function(){
    console.log("listening to port"+chalk.red('3000'));// print the listen to port on output
});// when using the chalk the color should be changed
