import express, { Request, Response } from 'express';
import {body} from 'express-validator';
import { BadRequestError, validateRequest } from '@puaonline/common';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken';


const router = express.Router()

router.post('/api/instructor/signup',
[
    body('email')
        .isEmail()
        .withMessage('Email must be valid.'),  
    body('password')
        .trim()
        .isLength({min:4 , max: 20})
        .withMessage('Password must be between 4 and 20 characters.')  

], validateRequest,async(req:Request, res:Response)=>{
    const is_deleted = false;
    const is_profile_completed = false;
    const type = "INSTRUCTOR";
    const {email, password} = req.body;
    const existingUser = await User.findOne({email})
    if(existingUser){
        if(existingUser.type === "INSTRUCTOR"){
            throw new BadRequestError('Email already exist.')
        }else{
            existingUser.set({
                type: "INSTRUCTOR",
              });
            const user =  await existingUser.save();
            //Generate JWT
                const userJwt = jwt.sign({
                    id : user.id,
                    email : user.email,
                },
                process.env.JWT_KEY!
                )

                //Store it on session object 
                req.session = {
                    jwt: userJwt
                };
                res.status(200).send({'data':user});
   
        }   
    }else{
        const user = User.build({email,password,is_deleted,is_profile_completed,type});
        await user.save();
         //Generate JWT
         const userJwt = jwt.sign({
            id : user.id,
            email : user.email,
        },
        process.env.JWT_KEY!
        )

        //Store it on session object 
        req.session = {
            jwt: userJwt
        };
        res.status(201).send({'data':user});     
    }

   


   

})

export {router as instructorSignupRouter}
