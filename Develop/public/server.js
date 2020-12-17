const express=require("express");
const app=express();
const {noteFile}=require("../db/db.json");
const fs= require('fs');

const PORT = 3001 ;

app.get('/index',(req,res)=>{

});
app.get('/notes',(req,res)=>{
 
});
app.get('*',(req,res)=>{

});

app.listen(PORT,()=>{
 console.log(`Listening on ${PORT}`);
});