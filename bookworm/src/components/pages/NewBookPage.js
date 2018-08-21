import React from 'react'
import{Segment}from'semantic-ui-react'
import SearchBookForm from '../forms/SearchBookForm'
import BookForm from '../forms/BookForm'

class NewBookPage extends React.Component{
    state={
        book:null
    }

    onBookSelect=(book)=>{
        this.setState({book:book})
    }

    addBook=()=>{
        console.log('book')
    }

    render(){
        return(
            <Segment>
            <h1>Add a new book to your collection</h1>
            <SearchBookForm onBookSelect={this.onBookSelect}/>

            {this.state.book&&<BookForm onSubmit={this.addBook} book={this.state.book}/>}
            </Segment>
        )
    }
}

export default NewBookPage