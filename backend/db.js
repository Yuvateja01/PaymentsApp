const mongoose = require("mongoose");

connectDb("mongodb+srv://yuvas2001:admin@cluster0.6duhljg.mongodb.net/")

async function connectDb(url){
    try{
    await mongoose.connect(url)
    console.log("connected to Database")
    }
    catch(err){
        console.log("Db connection failed"+err)
    }
}

const userSchema = new mongoose.Schema({
    userName:{unique:true,type:String},
    firstName:String,
    lastName:String,
    password:String
})
userSchema.index({firstName:"text",lastName:"text"})
const User = mongoose.model('Users',userSchema)


const accountSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    balance:Number

})
const Account = mongoose.model('Account',accountSchema)
module.exports = {
    User:User,
    Account:Account
}