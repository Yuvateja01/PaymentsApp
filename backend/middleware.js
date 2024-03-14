const jwt = require("jsonwebtoken");
const {User} = require("./db")


async function authMiddleWare(req,res,next){
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if(!authHeader){
        res.status(401).send("No auth token")
    }
    else{
    const token = authHeader.split(" ")[1]
    const isValid = jwt.verify(token,"JWTAUTHSECRET");
    if(isValid){

    const userObj = jwt.decode(token)
    req.userId = userObj.userId
    // console.log(req.userId)
    next();
    }
    else{
        res.status(401).send("Incorrect Token")
    }
}
}

module.exports = {
    authMiddleWare:authMiddleWare
}