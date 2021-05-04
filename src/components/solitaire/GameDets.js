
import React, {Component} from 'react';
import backgroundMusic1 from './chael-sparks.mp3';
import backgroundMusic2 from './Carefree.mp3'; 
import backgroundMusic3 from './barradeen-bedtime-after-a-coffee.mp3';
export default class GameDets extends Component{
    constructor(props){
        super(props)

        this.backgroundMusic = this.backgroundMusic.bind(this)
    }
    backgroundMusic(e){
        let choice;
        if (e === "backgroundMusic1"){
            choice = e;
        }
        else{
         choice = e.target.value;
        }
            let songs = document.getElementsByClassName('solitaireBackgroundMusic');
            for (let i = 0; i < songs.length; i++){
            songs[i].currentTime = 0;
            songs[i].loop = false;
            songs[i].pause()
            }
        
        if (choice === "noMusic"){
            return
        }
        else{

        setTimeout(()=>{
            let music = document.getElementById(choice);
            music.currentTime = 0;
            music.volume = .2;
            music.play()
            music.loop = true;
        }, 1000)
    }
}
    componentDidMount(){
        this.backgroundMusic('backgroundMusic1');
    }

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
                <select onChange={this.backgroundMusic}>
                    <option value="backgroundMusic1">music 1</option>
                    <option value="backgroundMusic2">music 2</option>
                    <option value="backgroundMusic3">music 3</option>
                    <option value="noMusic">music off</option>

                </select>
                <div id="moves">Moves: {this.props.moves}</div>
                <div id="time">Time: {displayTime}</div>
                <button id="newGame" onClick={this.props.newGame}>New Game</button>
                <button id="returnHome" onClick={this.props.returnHome}>Exit</button>
                <audio className="solitaireBackgroundMusic" id="backgroundMusic1">
                    <source src={backgroundMusic1} alt="Sparks by Chaël | https://soundcloud.com/chael_music
Music promoted by https://www.chosic.com/
Creative Commons Attribution 3.0 Unported License
https://creativecommons.org/licenses/by/3.0/deed.en_US
                "></source>
                </audio>
                <audio className="solitaireBackgroundMusic" id="backgroundMusic3">
                    <source src={backgroundMusic3}
                    alt="bedtime after a coffee by Barradeen | https://soundcloud.com/barradeen/
                    Creative Commons Attribution-ShareAlike 3.0 Unported
                    https://creativecommons.org/licenses/by-sa/3.0/deed.en_US
                    Music promoted by https://www.chosic.com/"
                    ></source>
                </audio>
                <audio className="solitaireBackgroundMusic" id="backgroundMusic2">
                    <source src={backgroundMusic2} alt="Carefree Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 4.0 License
http://creativecommons.org/licenses/by/4.0/
Music promoted on https://www.chosic.com">

                    </source>
                </audio>

                
            </div>
        )
    }
}