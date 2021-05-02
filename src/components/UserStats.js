import React, {Component} from 'react';


export default class UserStats extends Component{
    constructor(props){
        super(props);

        this.state = {
            solitaireStats: false,
            memoryStats: false,
        }

        
    }
    render(){
        let {stats} = this.props;
        console.log(stats)
        let statsDisplay = <div></div>
        if (this.state.solitaireStats === true){
            let {bestTime, gamesPlayed, gamesWon, leastMoves} = stats;
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
        else if (this.state.memoryStats === true){
            let memoryStats = this.props.stats.memory;
            console.log(memoryStats);
            console.log(Object.keys(memoryStats))
            statsDisplay = (<table id="memoryUserStatsDisplay">
                <thead>
                    <tr>
                        <th>Difficulty</th>
                        <th>Games Won</th>
                        <th>Best Time(seconds)</th>
                        <th>Least Moves</th>
                    </tr>
                </thead>
                <tbody>
                {Object.keys(memoryStats).map((key, index)=>{
                    return (
                        <tr key={index}>
                            <td>{key}</td>
                            <td>{memoryStats[key].gamesWon}</td>
                            <td>{memoryStats[key].time}</td>
                            <td>{memoryStats[key].moves}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>)
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