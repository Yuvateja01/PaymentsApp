const express = require("express")
const z = require("zod")
const jwt = require("jsonwebtoken")


const {User,Account} = require("./db")
const {UserSignUpSchema,UserLoginSchema,UpdateUserSchema} = require("./validator")
const {authMiddleWare} = require("./middleware")
const router = express.Router()


router.post("/signup",async(req,res)=>{
    const {userName,firstName,lastName,password} = req.body
    const newUser ={userName,firstName,lastName,password}
    const balance = Math.floor(Math.random()*1000)
    
    if(UserSignUpSchema.safeParse(newUser)){
        const {_id} = await User.create(newUser)
        await Account.create({userId:_id,balance:balance})
        res.status(200).send("User created successfully")
        
    }
    else{
        res.status(400).send("Wrong json payload")
        console.log("bad data check data")
    }
})


router.post("/login",async(req,res)=>{
    const {userName,password} = req.body
    const currentUser = {userName,password}
    // console.log("currentuser:")
    // console.log(currentUser)
    if(UserLoginSchema.safeParse(currentUser)){
        const result = await User.findOne(currentUser)
        // console.log(result)
        if(result == null){
            res.status(401).send("Unauthorized Bad Credentials")
        }
        //replace secret key with process.env
        else{
        const token = jwt.sign({userId:result._id},"JWTAUTHSECRET")
        res.status(200).json({"token":token})
        }
    }
    
})
router.use(authMiddleWare)

router.get("/test",(req,res)=>{
    res.status(200).send(`Testing middleware,user id-${req.userId}`)
})

router.put("",async(req,res)=>{
    const updateBody = req.body
    if(UpdateUserSchema.safeParse(updateBody)){
        const updatedUser = await User.updateOne({"_id":req.userId},req.body)
        res.status(200).send("Updated User Details")
    }
    else{
        res.status(404).send("Incorrect Update Information Sent")
    }
})

router.get("/bulk",async(req,res)=>{
    const query = req.query.filter;
    const results = await User.find({$text:{$search:query}}).exec();
    res.status(200).send(results)
})

module.exports = {
    UserRouter:router
}