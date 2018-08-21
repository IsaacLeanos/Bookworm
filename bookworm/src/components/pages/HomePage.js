import React from 'react'
import{connect}from'react-redux';
import{Link}from'react-router-dom'
import{attemptLogout}from'../../actions/auth'


export const HomePage=(props)=>{
    return(
        <div>
        <h1>Homepage</h1>
        {props.isAuthenticated?<button onClick={props.attemptLogout} to='/'>Logout</button>:
        <div><Link to='/login'>Login</Link> or <Link to='/signup'>Sign Up</Link></div>}
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        isAuthenticated:!!state.userReducer.token

    }
}


export default connect(mapStateToProps,{attemptLogout})(HomePage)