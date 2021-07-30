const express=require("express");
const fetch=require("node-fetch");
const app=express();
const cors = require('cors')
app.use(express.json());
const port= process.env.PORT||3000;
require("dotenv").config()
app.use(cors());
const headers = {
       
    Authorization:process.env.GITHUB_TOKEN,
  };

 
app.get("/",async(req,res)=>{
    res.send("wont show you data");
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
        
    
        commits = commits + result.length;
        lengthFlag = result.length;
        page++;
      } while (lengthFlag != 0);
        console.log(commits);
        
      res.send({commits});
    }
    catch(e){
        res.send(e);
    }
    


})


app.listen(port,(req,res)=>{
    console.log("server is up");
})