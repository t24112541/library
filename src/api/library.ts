import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

function createBookType(req:any,res:any){
    try{
        const result = prisma.bookType.create({data:req})
        res.json(result)
    }catch(error:any) {
        res.status(500).json({
            message: "Internal Server Error:"+ error.message,
        })
    }
    
}
module.exports = {createBookType}