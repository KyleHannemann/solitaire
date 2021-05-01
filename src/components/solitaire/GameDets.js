
import React, {Component} from 'react';

export default class GameDets extends Component{
    

    render(){
        let {time} = this.props;
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
        let displayTime = getTime(time);
        return(
            <div id="gameDets">
                <button id="undo"onClick={this.props.undo}>Undo</button>
                <div id="moves">Moves: {this.props.moves}</div>
                <div id="time">Time: {displayTime}</div>
                <button id="newGame" onClick={this.props.newGame}>New Game</button>
                <button id="returnHome" onClick={this.props.returnHome}>Exit</button>
                
            </div>
        )
    }
}