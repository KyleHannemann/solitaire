import axios from 'axios';
import App from '../App';
import React, {Component} from 'react';
import Register from './Register';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: "",
            newUser: false,
            loggedIn: true,
            newPassword: "",
            newUserName: "",
            solitaire: true,
            stats: [],
            
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
    logGame(time, moves, checkWin){
        axios.put('/api/profiles/games',{gameWon: true, time: time, moves: moves, userName: 
        this.state.userName, password: this.state.password})
        .then(response=>{
            this.setState({stats: response.data[0]})
        }).catch(err=>console.log(err))
    }
    delete(e){
        e.preventDefault();
        let id = this.state.stats.id;
        axios.delete(`/api/profiles/${id}`).then(response=>
            {console.log(response)
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
        //could also account for blank space for checking for ascii values
        if (newUserName.length < 0){
            newInfo = {userName: userName, password: password, newPassword: newPassword};
        }
        else if(newPassword.length < 0){
            newInfo = {userName: userName, password: password,newUserName: newUserName};
        }
        else{
            newInfo = {userName: userName, password: password, newUserName: newUserName, newPassword: newPassword}
        }
        axios.put('/api/profiles', newInfo).then(response=>{console.log(response);if (response.data){
            alert("update successful");
            let {userName, password} = response.data[0];
            let window = document.getElementById("edit");
           window.style.marginBottom = "2000px";
           window.style.display = "none";
           this.setState({userName: userName, password: password}, ()=>{
           })
           
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
            if (response.data.length === 1){
                this.welcome(response);
            }else{alert('invalid username and/or password')}
        }).catch(error=>{console.log(error); alert("error")})
        
    }
    welcome(response){
        this.setState({loggedIn: true})
        this.setState({stats: response.data[0]})
        console.log(response)
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
        else if ((this.state.newUser === false && this.state.loggedIn === true) && this.state.solitaire === false){
            let stats;
            if (this.state.stats){
                let {bestTime, gamesPlayed, gamesWon, leastMoves} = this.state.stats;
                if (bestTime === null){
                    bestTime = ""
                }
                else{
                    function getTime(t){
                        let seconds = t;
                        let minutes = 0;
                        let hours = 0;
                        while(seconds >= 60){
                            while (seconds >= 3600){
                            hours += 1;
                            seconds -= 3600;
                            }
                            minutes += 1;
                            seconds -= 60;
                        }
                        let time;
                        if (seconds < 10 && minutes < 10){
                            time = `${hours}:0${minutes}:0${seconds}`
                        }
                        else if (seconds < 10){
                            time = `${hours}:${minutes}:0${seconds}`
                        }
                        else if (minutes < 10){
                            time = `${hours}:0${minutes}:${seconds}`
                        }
                        else {time = `${hours}:${minutes}:${seconds}`}
                        return time;
                    }
                    bestTime = getTime(bestTime);
                }
                let winPercentage = "";
                if (parseInt(gamesPlayed) > 0){
                    winPercentage = parseInt(gamesWon)/parseInt(gamesPlayed);
                    if (winPercentage === 0){
                        winPercentage = "0%"
                    }
                    else{
                    winPercentage = winPercentage.toFixed(2)
                    winPercentage = winPercentage[2] + winPercentage[3] + "%"
                    }
                }
                stats = (<ul id="stats">
                    <button data-name="stats" onClick={this.closeWindow}>X</button>
                    <li>Best Time : {bestTime}</li>
                    <li>Least Amount of Moves: {leastMoves}</li>
                    <li>Total Games Played: {gamesPlayed}</li>
                    <li>Games Won: {gamesWon}</li>
                    <li>Win Percentage: {winPercentage}</li>
                </ul>)
            }
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
                    {stats}
                <div id="welcome">
                    <h3>Welcome {this.state.userName}</h3>
                    <div data-name="stats" onClick={this.openWindow}>View Stats</div>
                    <div>View Rankings</div>
                    <div data-name="edit"onClick={this.openWindow}>Edit Profile</div>
                    <div onClick={()=>{this.setState({solitaire: true}, ()=> console.log(this.state))}}>Start Game</div>
                </div>
                </div>
            )
        }
        else if (this.state.loggedIn === true && this.state.solitaire === true){
            console.log('start')
            login = (<App logGame={this.logGame} returnHome={()=>{this.setState({solitaire: false})}}/>)
        }
        else{login = (<Register login={()=>{this.setState({newUser: false})}}/>)}
        return(
            <div>
                {login}</div>
        )
    }
}