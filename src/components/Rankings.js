import React, {Component} from 'react';
import axios from 'axios';

export default class Rankings extends Component{
    constructor(props){
        super(props);

        this.state = {
            profiles: [],
            
        }
        this.sort = this.sort.bind(this)
    }

    componentDidMount(){
        axios.get('/api/profiles').then(response=>{
            console.log(response);
            this.setState({profiles: response.data})
        }).catch(err=>{
            console.log(err);
        })
    }
    sort(e){
        let sortBy = e.target.id;
        let buttons = Array.from(document.querySelectorAll("#sortByButtons > button"));
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = "rgb(233, 97, 97)";
            buttons[i].style.width = "125px";
            buttons[i].style.height = "35px";
        }
        let choosen = document.getElementById(sortBy)
        choosen.style.backgroundColor = "rgb(123, 168, 123)";
        choosen.style.height = "50px";
        choosen.style.width = "150px";
        console.log(sortBy)
        let order = "des"
        if(sortBy === "gamesWon"){
            order = "asc"
        }
        this.setState({
            profiles: this.state.profiles.sort((a,b,)=>{
                if (a[sortBy] === b[sortBy]){
                    return 0;
                }
                else if (a[sortBy] === null){
                    return 1; 
                }
                else if (b[sortBy] === null){
                    return -1;
                }
                else if (order === "des"){
                    return a[sortBy] < b[sortBy] ? -1: 1;
                }
                else {
                    return a[sortBy] < b[sortBy] ? 1: -1;
                }
                    
            })
        })

    }

    render(){
        let {user} = this.props;
        console.log(user);
        let ranks = (
            <div id="statsTable">
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th >Games Won</th>
                        <th >Best Time(sec)</th>
                        <th >Least Moves</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.profiles.map((el, index)=>{
                        let {userName, gamesWon, bestTime, leastMoves} = el;
                        if (userName === user){
                            return (<tr id="rankUserRow" key={index}>
                                <td>{userName}</td>
                                <td>{gamesWon}</td>
                                <td>{bestTime}</td>
                                <td>{leastMoves}</td>
                            </tr>)
                        }
                        else return(
    
                            <tr key={index}>
                                <td>{userName}</td>
                                <td>{gamesWon}</td>
                                <td>{bestTime}</td>
                                <td>{leastMoves}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        )
        return(
            <div id="viewStatsPage">
                <button id="statsReturnHome" onClick={()=>{this.props.home()}}>Home</button>
                <h1 id="sortedBy">Sort By</h1>
                <div id="sortByButtons"><button id="gamesWon" onClick={this.sort}>Games Won</button><button id="bestTime" onClick={this.sort}>Best Time</button><button id="leastMoves" onClick={this.sort}>Least Moves</button></div>
                {ranks}
            </div>
        )
    }
}