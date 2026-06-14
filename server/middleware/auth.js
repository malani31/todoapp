const jwt=require("jsonwebtoken")

const config=process.env; // get config vars

const verifyToken=(req,res,next)=>{
    const token= (req.body && req.body.token) || ( req.query && req.query.token) || req.headers["x-access-token"];

    console.log("headers =", req.headers);
    console.log("token =", token);
    // check if toke is present
    if(!token){
        return res.status(403).json({message:"A token is required for authentication"})
    }
    try{
        const decoded=jwt.verify(token,config.TOKEN_KEY);//verify token
        req.user=decoded; //save decoded token to request object
    }catch(err){
        return res.status(401).json({message:"Invalid token"})
    }

    return next(); //call next middleware
}

module.exports=verifyToken;