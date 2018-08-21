import express from 'express'
import User from '../models/User'
import _ from 'lodash'
import nodemailer from 'nodemailer'
                                                 
const router=express.Router()

router.post('/',(req,res)=>{
    const{email,password}=req.body.info
    const user=new User({email})  //1.create user                     schema{email,passwordHash,confirmed,confirmToken}
    user.hashPassword(password)   //2.hash password                         
    user.setConfirmationToken()   //3.set confirmToken                    
    user.save().then((user)=>{    //4.save user to DB                       
        sendConfirmationEmail(user)  //5.email user confirmToken           
        res.json({user:user.toAuthJSON()})  //5.return authJson dispatch object {email,confirmed,token}
    }).catch((e)=>{res.status(400).json({errors:{email:e.errors.email.message}})
    })                                                                          
})                                                                              


function sendConfirmationEmail(user){
    const tranport=setup()
    const email={
        from:'"Bookworm 👻" <Bookworm@bookworm.com>',
        to:user.email,
        subject:'Welcome to Bookworm',
        text:`Confirm your email ${user.generateConfirmationUrl()}`
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







// const parseErrors=(errors)=>{
//     const result={}
//     _.forEach(errors,(val,key)=>{
//         result[key]=val.message
//     })
//     return result
// }




export default router