const express=require("express");
const fetch=require("node-fetch");
const app=express();
const cors = require('cors')
app.use(express.json());
const port= process.env.PORT||3000;
require("dotenv").config()
app.use(cors());
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: process.env.GITHUB_TOKEN,
};

 
app.get("/",async(req,res)=>{
  res.send({ "text": "wont show you data" });
})
app.post("/getData", async (req, res) => {
  console.log("hello");

   

  let page = 1;
  let commits = 0;
  let lengthFlag = 99;
  const owner = req.body.owner;
  const repo = req.body.repo;

  try {
    do {
      console.log(page);
      const url = `https://api.github.com/repos/${owner}/${repo}/commits?page=${page}&per_page=100`;
    
      const response = await fetch(url, {
          
        headers: headers,
        mode: "no-cors"
      });
        
      const result = await response.json();
      console.log(result);
    
      commits = commits + result.length;
      lengthFlag = result.length;
      page++;
    } while (lengthFlag);
    console.log(commits);
    res.send({commits})
    //   res.sendStatus(200);
  }
  catch (e) {
    res.send(e);
  }
  // next();
});

app.listen(port, (req, res) => {
  console.log("server is up");
});
