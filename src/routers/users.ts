import { successResponse } from '../models/response';
import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

import multer from 'multer'
import {Users} from '../models/request'
import {status,errorResponse} from '../models/response'

const prisma = new PrismaClient()
const upload = multer()
const router= express.Router()

router.get('/',upload.none(),async(req:Request,res:Response)=>{
    try{
        const result = await prisma.users.findMany({
            where: {
                deleted: {
                    equals: null,
                },
            },
        })
        const success: successResponse = {
            code: status.success,
            message: result
        };

        res.status(success.code).json(success)
    }catch(error:any) {
        const err: errorResponse = {
            code: status.internalServerError,
            message: error.message,
        };
        
        res.status(err.code).json(err)
    }
});

router.get('/:id',upload.none(),async(req:Request,res:Response)=>{
    try{
        const result = await prisma.users.findMany({
            where: {
                id: parseInt(req.params['id']),
                deleted: {
                    equals: null,
                },
            }
        })

        const success: successResponse = {
            code: status.success,
            message: result
        };

        res.status(success.code).json(success)
    }catch(error:any) {
        const err: errorResponse = {
            code: status.internalServerError,
            message: error.message,
        };
        
        res.status(err.code).json(err)
    }
});

router.post('/', 
    upload.none(),
    async (req:Request,res:Response)=>{

        // ! transform to middleware
        const { value ,error } = Users.validate(req.body)

        if (error){
            const err: errorResponse = {
                code: status.badRequest,
                message: error.message,
            };

            return res.status(err.code).json(err) 
        }
        // //////////////
        
        try{
            const result = await prisma.users.create({
                data:value
            })
            
            const success: successResponse = {
                code: status.created,
                message: result
            };

            res.status(success.code).json(success)
        }catch(error:any) {
            const err: errorResponse = {
                code: status.internalServerError,
                message: error.message,
            };
            
            res.status(err.code).json(err)
        }
});

router.put('/:id',upload.none(),async(req:Request,res:Response)=>{
    try{
        // ! transform to middleware
        const { value ,error } = Users.validate(req.body)

        if (error){
            const err: errorResponse = {
                code: status.badRequest,
                message: error.message,
            };

            return res.status(err.code).json(err) 
        }
        // //////////////

        const result = await prisma.users.upsert({
            where: {
                id: parseInt(req.params['id'])
            },
            update: value,
            create: value,
        })

        const success: successResponse = {
            code: status.success,
            message: result
        };

        res.status(success.code).json(success)
    }catch(error:any) {
        const err: errorResponse = {
            code: status.internalServerError,
            message: error.message,
        };
        
        res.status(err.code).json(err)
    }
});

router.delete('/:id',upload.none(),async(req:Request,res:Response)=>{
    try{
        let date_ob = new Date();
        const result = await prisma.users.update({
            where: {
                id: parseInt(req.params['id'])
            },
            data: {deleted: date_ob},
        })
        const success: successResponse = {
            code: status.success,
            message: result
        };

        res.status(success.code).json(success)
    }catch(error:any) {
        const err: errorResponse = {
            code: status.internalServerError,
            message: error.message,
        };
        
        res.status(err.code).json(err)
    }
});

module.exports = router