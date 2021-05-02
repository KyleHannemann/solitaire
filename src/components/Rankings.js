import React, {Component} from 'react';
import axios from 'axios';

export default class Rankings extends Component{
    constructor(props){
        super(props);

        this.state = {
            profiles: [],
            solitaire: true,
            memory: false,
            memoryDifficulty: "easy",

            
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
        let sortBy = e.target.dataset.id;

        let buttons = Array.from(document.querySelectorAll("#sortByButtons > button"));
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = "rgb(233, 97, 97)";
            buttons[i].style.width = "125px";
            buttons[i].style.height = "35px";
        }
        let choosen = document.getElementById(e.target.id)
        choosen.style.backgroundColor = "rgb(123, 168, 123)";
        choosen.style.height = "50px";
        choosen.style.width = "150px";
        
        let order = "asc"
        if(sortBy === "gamesWon"){
            order = "des"
        }
        if(this.state.memory === true){
            let difficultLevel = this.state.memoryDifficulty;

            this.setState({profiles: this.state.profiles.sort((elA,elB)=>{
                let a = elA.memory[difficultLevel][sortBy];
                let b = elB.memory[difficultLevel][sortBy];
                if (a === null){
                    return 1;
                }
                if (b === null){
                    return -1;
                }
                if(order === "asc"){
                   return a < b ? -1: 1;
                }
                else {
                   return a < b ? 1: -1;
                }
                

            })})

        }
        else {
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
                else if (order === "asc"){
                    return a[sortBy] < b[sortBy] ? -1: 1;
                }
                else {
                    return a[sortBy] < b[sortBy] ? 1: -1;
                }
                    
            })
        })

    }
}

    render(){
        let {user} = this.props;
        let ranks;
        let display;
        if (this.state.solitaire === true){
         ranks = (
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
            display = (<div>
                <div id="sortByButtons"><button id="gamesWon" data-id="gamesWon" onClick={this.sort}>Games Won</button>
                <button id="bestTime" data-id="bestTime" onClick={this.sort}>Best Time</button>
                <button id="leastMoves"  data-id="leastMoves" onClick={this.sort}>Least Moves</button></div>
                {ranks}
                </div>
            )
        }
        else if (this.state.memory === true){
            let difficulty = this.state.memoryDifficulty;

            ranks = (<div id="statsTable">
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
                        let {userName} = el;
                        let {gamesWon, time, moves} = el.memory[difficulty];
                        if (userName === user){
                            return (<tr id="rankUserRow" key={index}>
                                <td>{userName}</td>
                                <td>{gamesWon}</td>
                                <td>{time}</td>
                                <td>{moves}</td>
                            </tr>)
                        }
                        else return(
    
                            <tr key={index}>
                                <td>{userName}</td>
                                <td>{gamesWon}</td>
                                <td>{time}</td>
                                <td>{moves}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
            )
            display = (<div>
                <div id="sortByMemoryGameDifficulty">
                    <input onChange={(e)=>{this.setState({memoryDifficulty: e.target.value}); 
                let buttons = Array.from(document.querySelectorAll("#sortByButtons > button"));
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = "rgb(233, 97, 97)";
            buttons[i].style.width = "125px";
            buttons[i].style.height = "35px";
        }
                }}  type="radio" name="memoryGameDifficultyRankings" value="easy" id="memEasyRankings" /><label htmlFor="memEasyRankings">Easy</label> 
                    <input onChange={(e)=>{this.setState({memoryDifficulty: e.target.value}); 
                let buttons = Array.from(document.querySelectorAll("#sortByButtons > button"));
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = "rgb(233, 97, 97)";
            buttons[i].style.width = "125px";
            buttons[i].style.height = "35px";
        }
                }} type="radio" name="memoryGameDifficultyRankings" value="medium" id="memMedRankings" /><label htmlFor="memMedRankings">Medium</label> 
                    <input onChange={(e)=>{this.setState({memoryDifficulty: e.target.value}); 
                let buttons = Array.from(document.querySelectorAll("#sortByButtons > button"));
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = "rgb(233, 97, 97)";
            buttons[i].style.width = "125px";
            buttons[i].style.height = "35px";
        }
                }} type="radio" name="memoryGameDifficultyRankings" value="hard" id="memHardRankings" /><label htmlFor="memHardRankings">Hard</label> 
                    <input onChange={(e)=>{this.setState({memoryDifficulty: e.target.value}); 
                let buttons = Array.from(document.querySelectorAll("#sortByButtons > button"));
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = "rgb(233, 97, 97)";
            buttons[i].style.width = "125px";
            buttons[i].style.height = "35px";
        }
                }} type="radio" name="memoryGameDifficultyRankings" value="extreme" id="memExRankings" /><label htmlFor="memExRankings">Extreme</label> 
                </div>
                <div id="sortByButtons"><button data-id="gamesWon" id="memoryGameSortByGames" onClick={this.sort}>Games Won</button>
                <button data-id="time" id="memoryGameSortByTime"onClick={this.sort}>Best Time</button>
                <button data-id="moves" id="memoryGameSortByMoves"onClick={this.sort}>Least Moves</button></div>
                {ranks}
                </div>
            )
            
        }
        return(
            <div id="viewStatsPage">
                <button id="statsReturnHome" onClick={()=>{this.props.home()}}>Home</button>
                <h1 id="sortedBy">Sort By</h1>
                <div id="selectGameRankings"><input onClick={()=>{this.setState({solitaire: true, memory: false})}} name="gameRanks"  id="solitaireRankings" value="solitaire" type="radio" />
                <label htmlFor="solitaireRankings">Solitaire</label>
                
                <input onClick={()=>{this.setState({solitaire: false, memory: true})}} name="gameRanks" id="memoryRankings" value="memory" type="radio" />
                <label htmlFor="memoryRankings">Memory</label>
                
                </div>
                {display}
            </div>
        )
    }
}