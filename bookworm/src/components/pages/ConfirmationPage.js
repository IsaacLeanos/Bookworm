import React from 'react'
import{Message,Icon}from'semantic-ui-react'
import{Link}from'react-router-dom'
import{connect}from'react-redux'
import{confirm}from'../../actions/auth'



export class ConfirmationPage extends React.Component{
    state={
        loading:true,
        success:false
    }

    componentDidMount(){
        setTimeout(()=>{
            this.props.confirm(this.props.match.params.token)
            .then(()=>{this.setState(()=>({loading:false,success:true}))})
            .catch(()=>{this.setState(()=>({loading:false,success:false}))})
        },3000)
    }

    render(){
        return(
            <div>
            {this.state.loading&&<Message icon>
                <Icon name='circle notched' loading/>
                <Message.Header>Validating your email</Message.Header>
                </Message>}

            {!this.state.loading&&this.state.success&&<Message success icon>
                <Icon name='checkmark'/>
                <Message.Header>Your account has been verified</Message.Header>
                <Link to='/dashboard'>Dashboard</Link>
                </Message>}

            {!this.state.loading&&!this.state.success&&<Message negative icon>
                <Icon name='warning sign'/>
                <Message.Header>Hmmm...Something went wrong</Message.Header>
                </Message>}
            </div>
        )
    }
}

export default connect(null,{confirm})(ConfirmationPage)