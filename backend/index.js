const express = require("express");
const {UserRouter} = require("./userRoutes")
const {AccountRouter} = require("./accountRoutes")
const cors = require("cors")

const app = express();


app.use(cors())
app.use(express.json())
app.use('/api/v1/user',UserRouter)
app.use('/api/v1/account',AccountRouter)

app.listen(3000,()=>console.log("Listening on port 3000"))


