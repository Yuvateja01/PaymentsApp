const express = require("express");
const mongoose = require("mongoose")
const {User,Account}= require("./db")
const {authMiddleWare} = require("./middleware")
const router = express.Router();

router.use(authMiddleWare)

router.get('/balance',async(req,res)=>{
    console.log(req.userId)
    console.log(typeof req.userId)
    const {balance} = await Account.findOne({userId:req.userId}).exec();
    res.status(200).send({balance:balance})
})

router.post('/transfer',async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    const {balance} = await Account.findOne({userId:req.userId}).session(session);
    const amount = req.body.amount;
    const recipient = req.body.to;
    const recipientData =  await User.findOne({userName:recipient}).session(session);
    console.log(recipientData)
    if(balance<amount)
    res.status(400).json({"message":"Insufficient Balance"})
    else{
        if(!recipientData){
            await session.abortTransaction();
           res.status(400).json({"message":"Invalid Recepient"}) 
        }
        else{
            const recipientBalance = await Account.findOne({userId:recipientData._id}).session(session);
            await Account.findOneAndUpdate({userId:recipientData._id},{balance:+recipientBalance.balance+(+amount)}).session(session);
            await Account.findOneAndUpdate({userId:req.userId},{balance:balance-amount}).session(session)
            await session.commitTransaction();
            res.status(200).send(`Money Transferred Successfully $${amount}`)

        }
    }
})
module.exports = {
    AccountRouter:router
}
