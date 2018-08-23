import React from 'react'
import{Menu,Dropdown,Image}from'semantic-ui-react'
import{Link}from'react-router-dom'
import gravatarUrl from 'gravatar-url'                                        //GRAVATAR URL THINGY (inspect)
import{connect}from'react-redux'
import{attemptLogout}from'../../actions/auth'

const TopNavigation=({user,attemptLogout})=>{
    return(
        <Menu secondary pointing>
        <Menu.Item as={Link} to='/dashboard'>Dashboard</Menu.Item>
        <Menu.Item>Something</Menu.Item>
        <Menu.Item>Something</Menu.Item>

        <Menu.Menu position='right'>
        <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
        <Dropdown.Menu>
        <Dropdown.Item onClick={()=>attemptLogout()}>Logout</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        </Menu.Menu>
        </Menu>
    )
}


const mapStateToProps=(state)=>{
    return{
        user:state.userReducer
    }
}

export default connect(mapStateToProps,{attemptLogout})(TopNavigation)