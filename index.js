const express=require("express");
const fetch=require("node-fetch");
const app=express();
// const cors = require('cors')
app.use(express.json());
const port= process.env.PORT||3000;
require("dotenv").config()
// app.use(cors());
const headers = {
       
    Authorization:process.env.GITHUB_TOKEN,
  };
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get("/",async(req,res)=>{
    res.send(headers);
})
app.post("/getData",async(req,res)=>{
    console.log("hello");

   

      let page=1;
      let commits=0;
      let lengthFlag=99;
    const owner=req.body.owner;
    const repo=req.body.repo;
    
    try{
    do {
        console.log(page);
        const url = `https://api.github.com/repos/${owner}/${repo}/commits?page=${page}&per_page=100`;
    
        const response = await fetch(url, {
          
          headers: headers,
        });
        
        const result =await response.json();
        console.log(result);
    
        commits = commits + result.length;
        lengthFlag = result.length;
        page++;
      } while (lengthFlag != 0);
        console.log(commits);
        res.status(200).send({commits:commits});
    //   res.sendStatus(200);
    }
    catch(e){
        res.send(e);
    }
    // next();


})


app.listen(port,(req,res)=>{
    console.log("server is up");
})