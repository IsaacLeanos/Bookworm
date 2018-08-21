import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import uniqueValidator from 'mongoose-unique-validator'


const schema=new mongoose.Schema({
    email:{type:String,required:true,lowercase:true,index:true,unique:true},
    passwordHash:{type:String,required:true},
    confirmed:{type:Boolean,default:false},
    confirmationToken:{type:String,default:''}
}
,{timestamps:true})

// -----------------------------  P A S S W O R D S ------------------------

schema.methods.hashPassword=function hashPassword(password){           //hashes user passwords
    this.passwordHash=bcrypt.hashSync(password,10)
}
schema.methods.isValidPassword=function isValidPassword(password){     //compares password&hashPassword
    return bcrypt.compareSync(password,this.passwordHash)
}

// -----------------------------  A u t h J S O N ------------------------

schema.methods.toAuthJSON=function toAuthJSON(){
    return{
        email:this.email,                            
        confirmed:this.confirmed,
        token:this.generateJWT()
    }
}

// -----------------------------  T O K E N S ------------------------

schema.methods.generateJWT=function generateJWT(){
    return jwt.sign({
        email:this.email,                                      //generates token with email and confirmed properties         
        confirmed:this.confirmed
    },process.env.JWT_SECRET_KEY)
}

schema.methods.setConfirmationToken=function setConfirmationToken(){
    this.confirmationToken=this.generateJWT()                  //generates token with email and confirmed properties 
}

schema.methods.generatePasswordToken=function generatePasswordToken(){
    return jwt.sign({                   
        _id:this._id,                                          //generates token using user id property
    },
    process.env.JWT_SECRET_KEY,
    {expiresIn:'1h'})
}

// -----------------------------  U R L ' S ------------------------

schema.methods.generateConfirmationUrl=function generateConfirmationUrl(){               
    return `${process.env.HOST}/confirmation/${this.confirmationToken}`
}
schema.methods.generateResetPasswordUrl=function generateResetPasswordUrl(){
    return `${process.env.HOST}/reset_password/${this.generatePasswordToken()}`
}




schema.plugin(uniqueValidator,{message:'Email already exist'})

export default mongoose.model('User',schema)

