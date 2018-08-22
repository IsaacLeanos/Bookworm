import React from 'react'
import{Form,Button,Message,Segment,Grid,Image}from'semantic-ui-react'
import InlineError from '../messages/InlineError'

class BookForm extends React.Component{
    state={
        data:{
            goodreadsId:this.props.book.goodreadsId,
            title:this.props.book.title,
            authors:this.props.book.authors,
            cover:this.props.book.covers[0],
            pages:this.props.book.pages
        },
        index:0,
        covers:this.props.book.covers,
        loading:false,
        errors:{},
    }

    componentWillReceiveProps(props){
        this.setState({data:{
            goodreadsId:props.book.goodreadsId,
            title:props.book.title,
            authors:props.book.authors,
            cover:props.book.covers[0],
            pages:props.book.pages,
        },
            covers:props.book.covers
    })
    }

    onChange=(e)=>{
        this.setState({...this.state,data:{...this.state.data,[e.target.name]:e.target.value}})
    }
    onChange=(e)=>{
        this.setState({...this.state,data:{...this.state.data,[e.target.name]:parseInt(e.target.value,10)}})
    }

    changeCover=()=>{
        const {index,covers}=this.state
        
        const newIndex=index+1>=covers.length?0:+1                                //newIndex=0 or 1,2,3,etc..

        this.setState({
            index:newIndex,
            data:{...this.state.data,cover:covers[newIndex]}
        })
    }
    // onSubmit=(e)=>{
    //     e.preventDefault()
    //     const errors=this.validate(this.state.data)
    //     this.setState(()=>({errors:errors}))
    //     if(Object.keys(errors).length===0){
    //         this.setState(()=>({loading:true}))
    //         this.props.onSubmit(this.state.data).catch((e)=>{
    //             this.setState(()=>({errors:e.response.data.errors,loading:false}))
    //         })
    //     }
    // }
    validate=(data)=>{
        const errors={}
        if(!data.title) errors.email='Cannot be blank'
        if(!data.authors) errors.email='Cannot be blank'
        if(!data.pages) errors.email='Cannot be blank'
        return errors
    }
    render(){
       const{title,authors,pages}=this.state.data
        return(
            <Segment>

            <Form onSubmit={this.onSubmit} loading={this.state.loading}>
            <Grid columns={2} fluid stackable>

            <Grid.Row style={{'border':'1px blue solid'}}>
            <Grid.Column style={{'border':'1px green solid'}}>

            <Form.Field error={!!this.state.errors.title}>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' value={title} onChange={this.onChange}/>
            {this.state.errors.title&&<InlineError text={this.state.errors.title}/>}
            </Form.Field>

            <Form.Field error={!!this.state.errors.authors}>
            <label htmlFor='authors'>Authors</label>
            <input type='text' id='authors' name='authors' value={authors} onChange={this.onChange}/>
            {this.state.errors.authors&&<InlineError text={this.state.errors.authors}/>}
            </Form.Field>

            <Form.Field error={!!this.state.errors.pages}>
            <label htmlFor='pages'>Pages</label>
            <input type='number' id='pages' name='pages' value={pages} onChange={this.onChangeNumber}/>
            {this.state.errors.pages&&<InlineError text={this.state.errors.pages}/>}
            </Form.Field>
            </Grid.Column>
            
            <Grid.Column style={{'border':'1px red solid'}}>
            <Image size='small' src={this.state.data.cover}/>
            {this.state.covers.length>1&&<a role='button' tabIndex={0} onClick={this.changeCover}>Cycle covers</a>}
            </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{'border':'1px blue solid'}}>
            <Button primary>Save</Button>
            </Grid.Row>

            </Grid>
            </Form>

            </Segment>
        )
    }
}

export default BookForm