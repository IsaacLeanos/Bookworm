import React from 'react'
import{Route,Redirect}from'react-router-dom'
import{connect}from'react-redux'

export const UserRoute=({component:Component,...rest,isAuthenticated})=>{
    return(
        <Route {...rest} render={(props)=>
        isAuthenticated?<Component {...props}/>:<Redirect to='/'/>}/>
    )
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticated:!!state.userReducer.token
    }
}

export default connect(mapStateToProps)(UserRoute)