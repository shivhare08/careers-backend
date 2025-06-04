const express = require('express');
const { careersModel } = require('../database');
const adminAuth = require('../middleman/adminAuth');
const careersRouter = express.Router();

careersRouter.get('/jobs',async(req,res)=>{
    try{
        const data = await careersModel.find().sort({_id:-1});
        res.send(data);
    }catch(e){
        console.log(e);
    }
})

module.exports = careersRouter