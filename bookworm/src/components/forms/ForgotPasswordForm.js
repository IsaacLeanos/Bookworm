import React from 'react'
import{Form,Button,Message}from'semantic-ui-react'
import isEmail from 'validator/lib/isEmail'
import InlineError from '../messages/InlineError'

export class ForgotPasswordForm extends React.Component{
    state={
        data:{email:''},
        loading:false,
        errors:{}
    }

    emailChange=(e)=>{
        let text=e.target.value
        this.setState(()=>({data:{...this.state.data,email:text}}))
    }

    validate=(data)=>{
        const errors={}
        if(!isEmail(data.email)) errors.email='Invalid email address'
        return errors
    }
  
    onSubmit=(e)=>{
        e.preventDefault()
        const errors=this.validate(this.state.data)
        this.setState(()=>({errors:errors}))
        if(Object.keys(errors).length===0){
            this.setState(()=>({loading:true}))
            this.props.onSubmit(this.state.data)
            .catch((e)=>{
                this.setState(()=>({errors:e.response.data.errors,loading:false}))
            })
        }
    }
    render(){
        return(
          <Form onSubmit={this.onSubmit} loading={this.state.loading}>
          {this.state.errors.global&&<Message negative>
            <Message.Header>{this.state.errors.global}</Message.Header>
        </Message>}
          <Form.Field error={!!this.state.errors.email}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' placeholder='email@mail.com'
          value={this.state.data.email} onChange={this.emailChange}/> 
          {this.state.errors.email&&<InlineError text={this.state.errors.email}/>}
          </Form.Field>
          <Button primary>Submit</Button>
          </Form>
        )
    }
}

export default ForgotPasswordForm

// error={!!this.state.error} ---semantic ui error for form.field