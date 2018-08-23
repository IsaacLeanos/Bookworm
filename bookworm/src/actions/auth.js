// import api from '../api'
import axios from 'axios'
import setAuthorizationHeader from '../utils/setAuthorizationHeader'

export const userLoggedIn=(user)=>{
    return{
        type:'USER_LOGGED_IN',
        user:user
    }
}
export const attemptLogin=(data)=>{
    return(dispatch)=>{
    return apiLogin(data).then((user)=>{
        localStorage.bookwormJWT=user.token
        setAuthorizationHeader(user.token)
        dispatch(userLoggedIn(user))
        })
    }
}

export const userLoggedOut=()=>{
    return{
        type:'USER_LOGGED_OUT'
    }
}
export const attemptLogout=()=>{
    return(dispatch)=>{
        localStorage.removeItem('bookwormJWT')
        setAuthorizationHeader()
        dispatch(userLoggedOut())
    }
}

export const confirm=(token)=>{
    return(dispatch)=>{
        return apiConfirm(token).then((user)=>{
            localStorage.bookwormJWT=user.token
            dispatch(userLoggedIn(user))
        })
    }
}

export const resetPasswordRequest=({email})=>{
    return()=>{
        return apiResetPasswordRequest(email)
    }
}

export const validateToken=(data)=>{
    return()=>{
        return apiValidateToken(data)
    }
}

export const resetPassword=(data)=>{
    return()=>{
        return apiResetPassword(data)
    }
}

const apiResetPassword=(info)=>axios.post('/api/auth/reset_password',{info})

const apiValidateToken=(info)=>axios.post('/api/auth/validate_token',{info})

const apiResetPasswordRequest=(email)=>axios.post('/api/auth/reset_password_request',{email})

const apiConfirm=(info)=>axios.post('/api/auth/confirmation',{info}).then((res)=>{return res.data.user})

const apiLogin=(info)=>axios.post('/api/auth',{info}).then((res)=>{return res.data.user})
// {email:mail@mail.com,confirmed:true,token:'ri8hn5j3fg0ekfjwfoj/89'}