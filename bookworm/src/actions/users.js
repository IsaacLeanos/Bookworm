import axios from 'axios'
import {userLoggedIn}from'./auth'

export const attemptSignup=(data)=>{
    return(dispatch)=>{
        return apiSignup(data).then((user)=>{
            localStorage.bookwormJWT=user.token
            dispatch(userLoggedIn(user))
        })
    }
}

const apiSignup=(info)=>axios.post('/api/users',{info}).then((res)=>{return res.data.user})

// user--{email:mail@mail.com,confirmed: ,token:'ri8hn5j3fg0ekfjwfoj/89'}--authJson
