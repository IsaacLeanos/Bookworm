import React from 'react'
import{connect}from'react-redux'
import{Message,Icon}from'semantic-ui-react'
import{validateToken,resetPassword}from'../../actions/auth'
import ResetPasswordForm from '../forms/ResetPasswordForm'

export class ResetPasswordPage extends React.Component{
    state={
        loading:true,
        success:false
    }

    componentDidMount(){
        return this.props.validateToken(this.props.match.params.token)
        .then(()=>{this.setState(()=>({loading:false,success:true}))})
        .catch(()=>{this.setState(()=>({loading:false,success:false}))})
    }

    onSubmit=(data)=>{
        return this.props.resetPassword(data).then(()=>{this.props.history.push('/login')})
    }

    render(){
        const{loading,success}=this.state
        const token=this.props.match.params.token

        return(
            <div>
            {loading&&<Message icon>
                <Icon name='circle notched' loading/>
                <Message.Header>Loading..</Message.Header>
                </Message>}

            {!loading&&success&&<Message success icon>
                <ResetPasswordForm onSubmit={this.onSubmit} token={token}/>
                </Message>}

            {!loading&&!success&&<Message negative icon>
                <Icon name='warning sign'/>
                <Message.Header>Hmmm...Something went wrong</Message.Header>
                </Message>}
            </div>
        )
    }
}

export default connect(null,{validateToken,resetPassword})(ResetPasswordPage)