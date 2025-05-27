const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
    },

    phone : {
        type : String,
        required : true
    },

    city : {
        type : String,
    },

    password:{
        type :String
    },

    image : {
        public_id : String,
        url:String,
            //required:true
        
    }
},{timestamps : true})

const userModel = mongoose.model('users',userSchema);


const adminSchema = new Schema({
    name : {
        type : String,
    },

    department :{
        type : String,
    },

    password:{
        type :String
    }
})

const adminModel = mongoose.model('admins',adminSchema);


const careersSchema = new Schema({
    title : {
        type : String,
    },
    experience : {
        type : String,
    },
    courses : {
        type : String,
    },
    batch : {
        type : String,
    },
    description : {
        type : String,
    },
    salary : {
        type : String,
    },
    location : {
        type : String,
    },
    aggrement : {
        type : String,
    },
    jobAddedBy : {
        name : String,
        department : String,
    }
})

const careersModel = mongoose.model('jobs',careersSchema);

const appliedSchema = new Schema({
    username : {
        type:String,
    },
    userId:{
        type : String
    },
    title :{
        type:String,
    },
    jobId : {
        type : String
    },
    jobLocation : {
        type : String
    }

})

const applyModel = mongoose.model('applie',appliedSchema);

const contactSchema = new Schema({
    name : {
        type:String,
    },
    email:{
        type : String
    },
    message :{
        type:String,
    }

})

const contactModel = mongoose.model('contact',contactSchema);


module.exports ={
    userModel : userModel,
    adminModel : adminModel,
    careersModel : careersModel,
    applyModel : applyModel,
    contactModel : contactModel
}