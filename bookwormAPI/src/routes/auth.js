import express from 'express'
import User from '../models/User'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const router=express.Router()

router.post('/',(req,res)=>{                                      //schema{email,passwordHash,confirmed,confirmToken}
    const{info}=req.body                                       
    User.findOne({email:info.email}).then((user)=>{      //1.find user email
        if(user&&user.isValidPassword(info.password)){   //2.found user&passwords match
            res.json({user:user.toAuthJSON()})           //3.return AuthJSON dispatch object {email,confirmed,token}
        }else if(!user){
            res.status(400).json({errors:{global:'User account not found'}})
        }else{
            res.status(400).json({errors:{global:'Incorrect password'}})
        }
    }).catch((e)=>{res.status(400).json({errors:{global:'Network error'}})
    })
})

router.post('/confirmation',(req,res)=>{
    const confirmationToken=req.body.info
    User.findOneAndUpdate({confirmationToken},{confirmationToken:'',confirmed:true},{new:true})
    .then((user)=>{
        user?res.json({user:user.toAuthJSON()}):res.status(400).json({})
    })
})

router.post('/reset_password_request',(req,res)=>{
    const email=req.body.email
    User.findOne({email:email}).then((user)=>{
        if(user){
            sendResetPasswordEmail(user)                                    //sends new password link to email
            res.json({})
        }else if(!user){
            res.status(400).json({errors:{global:'User account not found'}})
        }else{
            res.status(400).json({errors:{global:'Hmmm...Something went wrong'}})
        }
    })
})

router.post('/validate_token',(req,res)=>{
    const token=req.body.info
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err)=>{
        if(err){
            res.status(400).json({errors:{global:'Expired token'}})
        }else{
            res.json({})
        }
    })
})

router.post('/reset_password',(req,res)=>{
    const {password,token}=req.body.info
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
            res.status(400).json({errors:{global:'Invalid token'}})
        }else{
            User.findOne({_id:decoded._id}).then((user)=>{
                if(user){
                    user.hashPassword(password)
                    user.save().then(()=>{res.json({})})
                }else{
                    res.status(400).json({errors:{global:'Invalid token'}})
                }
            })
        }
    })
})

function sendResetPasswordEmail(user){
    const tranport=setup()
    const email={
        from:'"Bookworm 👻"<Bookworm@bookworm.com>',
        to:user.email,
        subject:'Reset password',
        text:`To reset your password, follow this link ${user.generateResetPasswordUrl()}`
    }
    tranport.sendMail(email)
}








function setup(){
    return nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })
}
export default router