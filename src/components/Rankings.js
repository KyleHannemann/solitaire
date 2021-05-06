import React, {Component} from 'react';
import axios from 'axios';

export default class Rankings extends Component{
    constructor(props){
        super(props);

        this.state = {
            solitaireStats: [],
            memoryStats: [],
            solitaire: true,
            memory: false,
            memoryDifficulty: "easy",
            displayMemoryStats: [],
            displaySolitaireStats: [],

            
        }
        this.sort = this.sort.bind(this)
    }

    componentDidMount(){
        axios.get('/api/profiles/solitaire').then(response=>{
            console.log(response);
            this.setState({solitaireStats: response.data, displaySolitaireStats: response.data})
        }).then(()=>{
            axios.get('api/profiles/memory').then(response=>{
                this.setState({memoryStats: response.data, displayMemoryStats: response.data}, ()=>{
                    console.log(this.state)
                });
            })
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
            let temp = [...this.state.memoryStats];
            this.setState({displayMemoryStats: temp.filter(el=>{
                if(el.difficulty === difficultLevel){
                        return el;
                }
                
            }).sort((elA,elB)=>{
                let a = elA[sortBy];
                let b = elB[sortBy];
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
            let temp = [...this.state.solitaireStats]
        this.setState({
            displaySolitaireStats: temp.sort((a,b,)=>{
                console.log('yo')
                if (a[sortBy] > b[sortBy]){
                    return 1;
                }
                else{
                    return -1;
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
                        <th >Time</th>
                        <th >Moves</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.displaySolitaireStats.map((el, index)=>{
                        let {username, time, moves} = el;
                        if (el.gamewon === false){
                            return null;
                        }
                        else if (username === user){
                            return (<tr id="rankUserRow" key={index}>
                                <td>{username}</td>
                                <td>{time}</td>
                                <td>{moves}</td>
                            </tr>)
                        }
                        else return(
    
                            <tr key={index}>
                                <td>{username}</td>
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
                <div id="sortByButtons">
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
                        <th >Time</th>
                        <th >Moves</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.displayMemoryStats.map((el, index)=>{
                           let {username, time, moves } = el;
                        if (el.difficulty !== difficulty){
                            return;
                        }
                     
                        
                        else if (username === user){
                            return (<tr id="rankUserRow" key={index}>
                                <td>{username}</td>
                                <td>{time}</td>
                                <td>{moves}</td>
                            </tr>)
                        }
                        else return(
    
                            <tr key={index}>
                                <td>{username}</td>
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
                    <input onChange={(e)=>{this.setState({memoryDifficulty: e.target.value
                ,displayMemoryStats: this.state.memoryStats    
                }); 
                let buttons = Array.from(document.querySelectorAll("#sortByButtons > button"));
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = "rgb(233, 97, 97)";
            buttons[i].style.width = "125px";
            buttons[i].style.height = "35px";
        }
                }}  type="radio" name="memoryGameDifficultyRankings" value="easy" id="memEasyRankings" /><label htmlFor="memEasyRankings">Easy</label> 
                    <input onChange={(e)=>{this.setState({memoryDifficulty: e.target.value
                ,displayMemoryStats: this.state.memoryStats    
                }); 
                let buttons = Array.from(document.querySelectorAll("#sortByButtons > button"));
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = "rgb(233, 97, 97)";
            buttons[i].style.width = "125px";
            buttons[i].style.height = "35px";
        }
                }} type="radio" name="memoryGameDifficultyRankings" value="medium" id="memMedRankings" /><label htmlFor="memMedRankings">Medium</label> 
                    <input onChange={(e)=>{this.setState({memoryDifficulty: e.target.value
                ,displayMemoryStats: this.state.memoryStats    
                }); 
                let buttons = Array.from(document.querySelectorAll("#sortByButtons > button"));
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = "rgb(233, 97, 97)";
            buttons[i].style.width = "125px";
            buttons[i].style.height = "35px";
        }
                }} type="radio" name="memoryGameDifficultyRankings" value="hard" id="memHardRankings" /><label htmlFor="memHardRankings">Hard</label> 
                    <input onChange={(e)=>{this.setState({memoryDifficulty: e.target.value
                ,displayMemoryStats: this.state.memoryStats    
                }); 
                let buttons = Array.from(document.querySelectorAll("#sortByButtons > button"));
        for (let i = 0; i < buttons.length; i++){
            buttons[i].style.backgroundColor = "rgb(233, 97, 97)";
            buttons[i].style.width = "125px";
            buttons[i].style.height = "35px";
        }
                }} type="radio" name="memoryGameDifficultyRankings" value="extreme" id="memExRankings" /><label htmlFor="memExRankings">Extreme</label> 
                </div>
                <div id="sortByButtons">
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