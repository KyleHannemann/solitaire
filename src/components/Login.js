import axios from 'axios';
import React, {Component} from 'react';
import Register from './Register';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: "",
            newUser: false,
        }
        this.update = this.update.bind(this);
        this.submit = this.submit.bind(this);
    }
    update(e){
        this.setState({[e.target.name]: e.target.value});
    }
    submit(e){
        e.preventDefault();
        let creds = {
            userName: this.state.userName,
            password: this.state.password
        }
        console.log(creds)
        axios.post('api/profiles/login', creds)
        .then(response=>{console.log(response);
            if (response.data.length === 1){this.props.loggedIn()}
        }).catch(error=>{console.log(error)})
        
    }

    render(){
        let login;
        if (this.state.newUser === false){
            login = (
                <div id="login">
                    <form>
                        <div><span>UserName</span><input name="userName"onChange={this.update}/></div>
                        <div><span>Password</span><input name="password" onChange={this.update}/></div>
                        <div><button onClick={this.submit}>Submit</button></div>
                    </form>
                    <div id="newUser">New User?<button onClick={()=>{this.setState({newUser: true})}}>Register</button>Here!</div>
                </div>
            )
        }
        else{login = (<Register login={()=>{this.setState({newUser: false})}}/>)}
        return(
            <div>{login}</div>
        )
    }
}