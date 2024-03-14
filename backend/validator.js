const z = require("zod");

const UserSignUpSchema = z.object({
    userName:z.string().min(6),
    firstname:z.string(),
    lastname:z.string(),
    password:z.string().min(8)
})

const UserLoginSchema = z.object({
    userName:z.string(),
    password:z.string().min(8)
})

const UpdateUserSchema = z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()
})

const TransferSchema = z.object({
    to:z.string(),
    amount:z.number()
})
module.exports = {
    UserSignUpSchema:UserSignUpSchema,
    UserLoginSchema:UserLoginSchema,
    UpdateUserSchema:UpdateUserSchema,
    TransferSchema:TransferSchema
}