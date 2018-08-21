import React from 'react'
import{connect}from'react-redux'
import{ConfirmEmailMessage}from'../messages/ConfirmEmailMessage'
import{Link}from'react-router-dom'
import{allBooksSelector}from'../../reducers/book'
import AddBookCta from '../ctas/AddBookCta'

export const DashboardPage=({isConfirmed,books})=>{
    return(
        <div>
        <h1>Dashboard</h1>
        {!isConfirmed&&<ConfirmEmailMessage/>}
        {isConfirmed&&<Link to='/'>Home</Link>}    
        {books.length===0&&<AddBookCta/>}
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        isConfirmed:!!state.userReducer.confirmed,
        books:allBooksSelector(state)
    }
}

export default connect(mapStateToProps)(DashboardPage)