const express = require('express');
const { userModel,careersModel, applyModel } = require('../database');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const userAuth = require('../middleman/userAuth');
const jwt_key_user = "users"
const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
  cloud_name: 'daa5rkqdc', 
  api_key: '843127716237467', 
  api_secret: 'vmk7PCGmjeisM9miWLQWIqazHhs'
});


userRouter.post('/signup', async (req, res) => {
    // const { name, phone , city } = req.body;
    const name = req.body.name;
    const phone = req.body.phone;
    const city = req.body.city;
    const password = req.body.password;
    const file = req.files.image

    const existingUser = await userModel.findOne({phone : phone});
    if(existingUser){
        // res.json({
        //     message : "phone is already exist"
        // })
        return;
    }

    const myfile = await cloudinary.uploader.upload(file.tempFilePath,{
        folder : 'users_images'
    })
    try {

        const zodAuthentication = zod.object({
            name : zod.string().min(2),
            phone : zod.string().min(10),
            city : zod.string().min(3),
            password : zod.string().min(3)
        })

        const parseData = zodAuthentication.safeParse(req.body);
        if(!parseData.success){
            res.json({
                msg : "Sorry",
                reason : parseData.error
            })
            return;
        }

        const hashPassword = await bcrypt.hash(password,10)
        const createData = await userModel.create({
            name,
            phone,
            city,
            password : hashPassword,
            image:{
                public_id : myfile.public_id,
                url:myfile.secure_url
            }
            
        })
        res.json({
            status : `${name}, your account is created`
        })
    } catch (e) {
        console.log(e);
    }
})

userRouter.post('/signin',async(req,res) =>{
    try{    
        const phone = req.body.phone;
        const password = req.body.password;
        
        const findPhone = await userModel.findOne({phone : phone});
        if(!findPhone){
            res.json({
                status : "sorry , this number is not exist"
            })
            return;
        }

        const passwordChecking = await bcrypt.compare(password , findPhone.password);
        if(passwordChecking){
            const token = await jwt.sign({
                _id : findPhone._id
            },jwt_key_user)

            res.json({
                status: "login done successfully",
                token : token, 
            })
        }else{
            res.json({
                status : "invalid user"
            })
        }
    }catch(e){
        console.log(e);
    }
})

userRouter.get('/myprofile',userAuth ,async(req,res)=>{
    try{
        const data = await userModel.find({_id : req.id});
        res.json({
            data : data
        })
    }catch(e){
        console.log(e);
    }
})

userRouter.post('/jobapply',userAuth, async(req,res)=>{
    try{

        const user = await userModel.findById(req.id);
        const title = req.body.title
        // console.log(user.name);
        const jobDetails = await careersModel.findOne({title : title});
        // console.log(jobDetails.salary);
        
        const data = await applyModel.create({
            username : user.name,
            userId : req.id,
            title,
            jobId : jobDetails._id,
            jobLocation : jobDetails.location
         })
            res.json({
                status : `you have applied for ${title} role`,
                message : `Thank you ${user.name}`
            })

    }catch(e){
        console.log(e);
    }
})

userRouter.get('/allapplications',userAuth,async (req,res)=>{
    try{
        const data = await careersModel.find().sort({_id:-1})
        res.json({
            applications : data
        })
        // console.log(data);
        
    }catch(e){
        console.log(e);
    }
})

userRouter.get('/myapplications',userAuth,async (req,res)=>{
    try{
        const data = await applyModel.find({userId : req.id})
        res.json({
            applications : data
        })
    }catch(e){
        console.log(e);
    }
})

// userRouter.get('/logout',userAuth ,async (req,res)=>{
//     try{
//         localStorage.removeItem('token')
//     }catch(e){
//         console.log(e);
//     }
// })

module.exports = userRouter;