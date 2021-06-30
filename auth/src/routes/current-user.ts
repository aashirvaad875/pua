import express from 'express';
import { currentUser } from '@puaonline/common';
import { User } from '../models/user';


const router = express.Router()

router.get('/api/users/currentuser',currentUser, async(req, res)=>{
    const existingUser = await User.findOne({ "_id":req.currentUser?.id });
    res.send({data:existingUser || null})
})

export {router as currentUserRouter}