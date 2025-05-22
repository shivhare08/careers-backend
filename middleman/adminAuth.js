const jwt = require('jsonwebtoken');
const jwt_key_admin = "admin"

function  adminAuth(req,res,next){
    try{
        const token = req.headers.token;
        const verifyToken = jwt.verify(token,jwt_key_admin);

        if(verifyToken){
            req.id = verifyToken._id
            next()
        }else{
            res.json({
                status : "login again",
            })
        }
    }catch(e){
        console.log(e);
    }
}


module.exports = adminAuth;