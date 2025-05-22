const jwt = require('jsonwebtoken');
const jwt_key_user = "users"

function  userAuth(req,res,next){
    try{
        const token = req.headers.token;
        const verifyToken = jwt.verify(token,jwt_key_user);

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


module.exports = userAuth;