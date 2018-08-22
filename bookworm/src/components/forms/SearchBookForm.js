import React from 'react'
import{Form,Dropdown}from'semantic-ui-react'
import axios from 'axios'

class SearchBookForm extends React.Component{
    state={
        query:'',
        loading:false,
        books:{},
        options:[]
    }

    onChange=(e,data)=>{
        this.setState({query:data.text})            // data.value
        this.props.onBookSelect(this.state.books[data.value])

    }

    onSearchChange=(e,data)=>{
        clearTimeout(this.timer)
        this.setState({query:data.searchQuery})
        this.timer=setTimeout(this.fetchOptions,1000)
    }

    fetchOptions=()=>{
        if(!this.state.query)return;
        this.setState({loading:true})
        axios.get(`/api/books/search?q=${this.state.query}`)
        .then((res)=>{return res.data.books})
        .then((books)=>{
            const options=[]                
            const booksHash={}                 // {id:{id,title,authors,pages,covers}}
            books.forEach((book)=>{
               booksHash[book.goodreadsId]=book
               options.push({
                    key:book.goodreadsId,                                  // [{key:id,value:id,text:title},]
                    value:book.goodreadsId,
                    text:book.title
                })
            })
            this.setState({loading:false,options:options,books:booksHash})
        })
    }

    render(){
        return(
            <Form>
            <Dropdown 
            search fluid placeholder='search..' value={this.state.query} loading={this.state.loading}
            onSearchChange={this.onSearchChange} options={this.state.options} onChange={this.onChange}>
            </Dropdown>
            </Form>
        )
    }
}

export default SearchBookForm
