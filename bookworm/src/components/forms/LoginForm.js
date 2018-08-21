import React from 'react'
import{Form,Button,Message}from'semantic-ui-react'
import Validator from 'validator'
import InlineError from '../messages/InlineError'

class LoginForm extends React.Component{
    state={
        data:{
            email:'',
            password:''
        },
        loading:false,
        errors:{},
    }

    emailChange=(e)=>{
        let text=e.target.value
        this.setState(()=>({data:{...this.state.data,email:text}}))
    }
    passwordChange=(e)=>{
        let text=e.target.value
        this.setState(()=>({data:{...this.state.data,password:text}}))
    }
    onSubmit=(e)=>{
        e.preventDefault()
        const errors=this.validate(this.state.data)
        this.setState(()=>({errors:errors}))
        if(Object.keys(errors).length===0){
            this.setState(()=>({loading:true}))
            this.props.onSubmit(this.state.data).catch((e)=>{
                this.setState(()=>({errors:e.response.data.errors,loading:false}))
            })
        }
    }
    validate=(data)=>{
        const errors={}
        if(!Validator.isEmail(data.email)) errors.email='Invalid email address'
        if(!data.password) errors.password='Password cannot be blank'
        return errors
    }
    render(){
        return(
            <Form onSubmit={this.onSubmit} loading={this.state.loading}>
            {this.state.errors.global&&<Message negative>
                <Message.Header>Something went wrong</Message.Header>
                <p>{this.state.errors.global}</p>
            </Message>}
            <Form.Field error={!!this.state.errors.email}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='example@example.com'
            value={this.state.data.email} onChange={this.emailChange}/>
            {this.state.errors.email&&<InlineError text={this.state.errors.email}/>}
            </Form.Field>

            <Form.Field error={!!this.state.errors.password}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' placeholder='password'
            value={this.state.data.password} onChange={this.passwordChange}/>
            {this.state.errors.password&&<InlineError text={this.state.errors.password}/>}
            </Form.Field>
            <Button primary>Login</Button>
            </Form>
        )
    }
}
// {this.state.errors.global&&<p style={{color:'red'}}>{this.state.errors.global}</p>}

// <Form onSubmit={this.onSubmit} loading={this.state.loading}>
// {this.state.errors.global&&<Message negative>
//     <Message.Header>Something went wrong</Message.Header>
//     <p>{this.state.errors.global}</p>
// </Message>}
// <Form.Field error={!!this.state.errors.email}>
// <label htmlFor='email'>Email</label>
// <input type='email' id='email' name='email' placeholder='example@example.com'
// value={this.state.data.email} onChange={this.emailChange}/>
// {this.state.errors.email&&<InlineError text={this.state.errors.email}/>}
// </Form.Field>

// <Form.Field error={!!this.state.errors.password}>
// <label htmlFor='password'>Password</label>
// <input type='password' id='password' name='password' placeholder='password'
// value={this.state.data.password} onChange={this.passwordChange}/>
// {this.state.errors.password&&<InlineError text={this.state.errors.password}/>}
// </Form.Field>
// <Button primary>Login</Button>
// </Form>

export default LoginForm

// error={!!this.state.error} ---semantic ui error for form.field