import jwt from 'jsonwebtoken'

export default(req,res,next)=>{
    const header=req.headers.authorization                                            // what if no authorization header?           
    if(!req.headers.authorization) res.status(400).json({errors:{global:'No header'}})

    let token                                    

    if(header) token=header.split(' ')[1]                                             //bearer token

    if(token){
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err){
                res.status(400).json({errors:{global:'Invalid token'}})
            }else{
                next()
            }
        })
    }else{
        res.status(400).json({errors:{global:'No token'}})
    }
}



