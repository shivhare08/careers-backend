const express = require('express');
const { contactModel } = require('../database');
const userAuth = require('../middleman/userAuth');
const contactRouter = express.Router();



contactRouter.post('/message',userAuth,async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;

        const datacreate = await contactModel.create({
            name,
            email,
            message
        })
        res.json({
            status: "message is sent",
        })
    }catch(e){
        console.log(e);
    }
})


module.exports = contactRouter
