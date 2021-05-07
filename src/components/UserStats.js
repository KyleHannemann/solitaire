import React, {Component} from 'react';
import axios from 'axios';

export default class UserStats extends Component{
    constructor(props){
        super(props);

        this.state = {
            solitaireStats: false,
            memoryStats: false,
            memoryStatsDifficulty: 'easy',
            solStats: [],
            memStats: [],
            loadingStats: true,
            
        }

        
    }
    componentDidMount(){
        //GET sol and mem stats axios.get
        axios.get(`/api/profiles/gamesStats/solitare/${this.props.userId}`).then(response=>{
            console.log(response)
            this.setState({solStats: response.data})
        }).then(()=>
        axios.get(`/api/profiles/gamesStats/memory/${this.props.userId}`).then(response=>{
            console.log(response)
            this.setState({memStats: response.data}, ()=>{
                this.setState({loadingStats: false}, ()=>{
                    console.log(this.state)
                });
            })
        })).catch(err=>{console.log(err)})
        //CHANGE code below to use new data
    }
    render(){
        let {stats} = this.props;
        console.log(this.state)
        let statsDisplay = <div></div>
        if (this.state.solitaireStats === true && this.state.loadingStats === false){
            let bestTime = this.state.solStats.bestTime[0].min;
            let gamesPlayed = this.state.solStats.totalGames[0].count;
            let gamesWon = this.state.solStats.wins[0].count;
            let leastMoves = this.state.solStats.bestMoves[0].min;
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
            let winPercentage;
            if (parseInt(gamesPlayed) > 0){
                winPercentage = parseInt(gamesWon)/parseInt(gamesPlayed);
                if (winPercentage === 0){
                    winPercentage = "0%"
                }
               else if (winPercentage === 1){
                    winPercentage = "100%"
                }
                else {
                    winPercentage = winPercentage.toFixed(2)
                //  winPercentage = winPercentage.toFixed(2)
                    winPercentage = winPercentage[2] + winPercentage[3] + "%"
                }
            }
            else{winPercentage = ""}
            statsDisplay = (
            <table id="solitaireUserStatsDisplay">
                <tbody>
                <tr><td>Best Time</td><td>{bestTime}</td></tr>
                <tr><td>Least Moves</td><td>{leastMoves}</td></tr>
                <tr><td>Total Games Played</td><td>{gamesPlayed}</td></tr>
                <tr><td>Games Won</td><td>{gamesWon}</td></tr>
                <tr><td>Win Percentage</td><td>{winPercentage}</td></tr>
                </tbody>
            </table>)
        }
        else if (this.state.memoryStats === true && this.state.loadingStats === false){
            let stats = this.state.memStats[this.state.memoryStatsDifficulty];
            let bestTime = null;
            let bestMoves = null;
            let gamesWon = 0;
            if (stats.length >= 1){
                for (let i = 0; i < stats.length; i++){
                    if (stats[i].gamewon === true){
                        gamesWon++;
                        if(bestTime === null || stats[i].time < bestTime){
                            bestTime = stats[i].time
                        }
                        if(bestMoves === null || stats[i].moves < bestMoves){
                            bestMoves = stats[i].moves;
                        }
                    }
                }
            }
            statsDisplay = (<div>
                <div id="userStatsDisplaySelect">
                <select onChange={(e)=>{
                    this.setState({memoryStatsDifficulty: e.target.value})
                }}>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                    <option value="extreme">extreme</option>
                </select>
                </div>
                <table id="memoryUserStatsDisplay">
                <thead>
                    <tr>
                        <th>Games Won</th>
                        <th>Best Time(seconds)</th>
                        <th>Least Moves</th>
                    </tr>
                </thead>
                <tbody>
                
                
                        <tr >
                            <td>{gamesWon}</td>
                            <td>{bestTime}</td>
                            <td>{bestMoves}</td>
                        </tr>
                    
                
                </tbody>
            </table></div>)
        }
        return(
            <div id="userStatsDisplay">
            <button id="userStatsDisplayHomeButton" onClick={this.props.returnHome}>Home</button>
            <h2>Stats</h2>
            <h4 style={{color: "white"}}>Select Game</h4>
            <div>
                <input onChange={()=>{this.setState({solitaireStats: true, memoryStats: false})}}
                type="radio" name="userStatsDisplayGames" value="solitaireStats"/><label htmlFor="solitaireStats">Solitaire</label>
                <input onChange={()=>{this.setState({memoryStats: true, solitaireStats: false})}}
                 type="radio" name="userStatsDisplayGames" value="memoryStats"/><label htmlFor="memoryStats">Memory</label>
            </div>
                {statsDisplay}</div>
        )
    }


}