import axios from 'axios';
import './App.css';
import React, {Component} from 'react';
import Register from './components/Register';
import Rankings from './components/Rankings';
import ChooseGame from './components/ChooseGame';
import UserStats from './components/UserStats';

//make separate component for stats
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: "",
            newUser: false,
            loggedIn: false,
            newPassword: "",
            newUserName: "",
            stats: "",
            rankings: false,
            chooseGame: false,
            viewStats: false,
            
            
        }
        this.update = this.update.bind(this);
        this.submit = this.submit.bind(this);
        this.welcome = this.welcome.bind(this);
        this.openWindow = this.openWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.logGame = this.logGame.bind(this)
    }
    
    logGame(game, time, moves, checkWin, difficulty){
        if(game === "solitaire"){
        axios.put('/api/profiles/games',{gameWon: checkWin, time: time, moves: moves, userName: 
        this.state.userName, password: this.state.password})
        .then(response=>{
            console.log(response)
            this.setState({stats: response.data})
        }).catch(err=>console.log(err))
    }
    if (game === "memory"){
        console.log(game, time, moves, checkWin)
        axios.put(`/api/profiles/games/memory`, {gameWon: checkWin, time: time, moves: moves, userName:
        this.state.userName, password: this.state.password, difficulty: difficulty})
        .then(response =>{
            console.log(response);
            this.setState({stats: response.data})
        }).catch(err=>console.log(err))
    }
}
    delete(e){
        e.preventDefault();
        let id = this.state.stats.id;
        axios.delete(`/api/profiles/${id}`).then(response=>
            {
                if (response.status === parseInt(200)){
                    alert("successfully deleted profile")
                    this.setState({loggedIn: false})
                }
            }).catch(error=>console.log(error))
    }
    edit(e){
        
        e.preventDefault();
        let {userName, password, newPassword, newUserName} = this.state;

        let newInfo;
        if (newPassword.length === 0 && newUserName.length === 0){
            alert("no changes have been made");
            return;
        }
        //could also account for blank space for checking for ascii values
        if (newUserName.length === 0){
            newInfo = {userName: userName, password: password, newPassword: newPassword};
        }
        if(newPassword.length === 0){
            newInfo = {userName: userName, password: password,newUserName: newUserName};
        }
        
        else{
            newInfo = {userName: userName, password: password, newUserName: newUserName, newPassword: newPassword}
        }
        axios.put('/api/profiles', newInfo).then(response=>{console.log(response);if (response.data){
            alert("update successful");
            let {userName, password} = response.data;
        
            let window = document.getElementById("edit");
           window.style.marginBottom = "2000px";
           window.style.display = "none";
           this.setState({userName: userName, password: password}, ()=>{
          console.log(this.state) })
           
            }
            else{
                alert("update failed")
            }})
        .catch(error=>{console.log(error); alert("update failed")})
        


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
        axios.post('/api/profiles/login', creds)
        .then(response=>{
            if (response.data){
                console.log(response)
               this.welcome(response.data)
            }else{alert('invalid username and/or password')}
        }).catch(error=>{console.log(error); alert("error")})
        
    }
    welcome(stats){
        this.setState({stats: stats},()=>(this.setState({loggedIn: true})))
       
       
    }
    openWindow(e){
        e.preventDefault()
        let window = document.getElementById(e.target.dataset.name)
        window.style.marginBottom = "0px";
        window.style.display = "block";
    }
    closeWindow(e){
        e.preventDefault()
       let window = document.getElementById(e.target.dataset.name);
       window.style.marginBottom = "2000px";
       window.style.display = "none";
    }

    render(){
        let login;
        if (this.state.newUser === false && this.state.loggedIn === false){
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
        //check if any game is true;
        //improve this giant if statement..
        else if (this.state.newUser === false && this.state.loggedIn === true && this.state.rankings === false && this.state.chooseGame === false
            && this.state.viewStats === false){
            
            let edit = (<div id="edit">
            <form>
                <button data-name="edit" id="editClose" onClick={this.closeWindow}>X</button>
                <div><span>New UserName</span><input name="newUserName"onChange={this.update}/></div>
                <div><span>New Password</span><input name="newPassword" onChange={this.update}/></div>
                <div><button onClick={this.edit}>Submit</button></div>
                <div><button onClick={this.delete}>Delete Profile</button></div>
            </form>
        </div>)
            login = (
                <div id="welcomeContainer">
                    {edit}
                <div id="welcome">
                    <h3>Welcome {this.state.userName}</h3>
                    <div data-name="stats" onClick={()=>{this.setState({viewStats: true})}}>View Stats</div>
                    <div onClick={()=>{this.setState({rankings: true})}}>View Rankings</div>
                    <div data-name="edit"onClick={this.openWindow}>Edit Profile</div>
                    <div onClick={()=>{this.setState({chooseGame: true})}}>Choose Game</div>
                    <div onClick={()=>{this.setState({loggedIn: false})}}>Logout</div>
                </div>
                </div>
            )
        }
        else if (this.state.loggedIn === true && this.state.chooseGame === true){
           login= ( <ChooseGame returnHome={()=>{this.setState({chooseGame: false})}}
            logGame={this.logGame}/> )

        }
        else if (this.state.loggedIn === true && this.state.viewStats === true){
            login = (<UserStats stats={this.state.stats} returnHome={()=>{this.setState({viewStats: false})}}/>)
        }

        else if (this.state.loggedIn === true && this.state.rankings === true){
            login = (<Rankings user={this.state.userName} home={()=>{this.setState({rankings: false})}}/>)
        }
        
        else{login = (<Register login={()=>{this.setState({newUser: false})}}/>)}
        return(
            <div>
                {login}</div>
        )
    }
}