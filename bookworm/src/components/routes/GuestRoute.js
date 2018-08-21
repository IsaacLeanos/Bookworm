import React from 'react'
import{Route,Redirect}from'react-router-dom'
import{connect}from'react-redux'

export const GuestRoute=({component:Component,...rest,isAuthenticated})=>{
    return(
        <Route {...rest} render={(props)=>
        isAuthenticated?<Redirect to='/dashboard'/>:<Component {...props}/>
    }/>
    )
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticated:!!state.userReducer.token
    }
}

export default connect(mapStateToProps)(GuestRoute)