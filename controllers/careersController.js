const express = require('express');
const { careersModel } = require('../database');
const careersRouter = express.Router();

careersRouter.get('/jobs',async (req,res)=>{
    try{
        const data = await careersModel.find();
        res.send(data);
    }catch(e){
        console.log(e);
    }
})

module.exports = careersRouter