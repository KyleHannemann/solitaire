import React, {Component} from 'react';
import axios from 'axios';


export default class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            userName: "",
            password: "",
            email: "",
        }
        this.update = this.update.bind(this)
        this.register = this.register.bind(this)
    }
    update(e){
        this.setState({[e.target.name]: e.target.value})
    }
    register(e){
        e.preventDefault();
        let {userName, password, email} = this.state;
        if (userName.length === 0 || password.length === 0 || email.length === 0){
            alert('please enter username, password and email')
            return;
        }
        let newProfile = {
            userName: userName,
            password: password,
            email: email,
        }

        axios.post('/api/profiles', newProfile).then(response=>{console.log(response)
        
            this.props.login();
        
        })
        .catch(error=>{console.log(error);
        alert("username is unavailable")
        });

        
       
    
    }

    render(){
        return(
            <div id="register">
                <form>
                    <div><span>Choose UserName</span><input name="userName"onChange={this.update}/></div>
                    <div><span>Choose Password</span><input name="password" onChange={this.update}/></div>
                    <div><span>Enter Email</span><input name="email" onChange={this.update}/></div>
                    <div><button onClick={this.register}>Register</button></div>
                </form>
            </div>
        )
    }
}