import React, {Component} from 'react';
import App from './solitaire/App';
import Memory from './memoryGame/Memory';
export default class ChooseGame extends Component{
constructor(props){
    super(props);

    this.state = {
        solitaire: false,
        memory: false,
        memoryDifficulty: "easy",
        
    }
    this.changeMemoryDifficulty = this.changeMemoryDifficulty.bind(this)
}

changeMemoryDifficulty(e){
    this.setState({memoryDifficulty: e.target.value}, ()=>{
        
    })

}


    render(){
        let game;
        if (this.state.memory === true){
            game = (<Memory logGame={this.props.logGame} returnHome={()=>{this.setState({memory: false})}}difficulty={this.state.memoryDifficulty} />)

        }
        else if (this.state.solitaire === true){
            game = (<App logGame={this.props.logGame} returnHome={()=>{this.setState({solitaire: false})}}/>)

        }
        else {
            game = ( <div id="chooseGameContainer">
            <div id="chooseGameReturnHome"onClick={this.props.returnHome}>Home</div>
    
            <div id="chooseGame">
                <h3>Solitaire</h3>
                <div onClick={()=>{this.setState({solitaire: true})}}>Start Game</div>
                <h3>Memory</h3>
                <select onChange={this.changeMemoryDifficulty}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="extreme">Extreme</option>
                </select>
                <div onClick={()=>this.setState({memory: true})}>Start Game</div>
            </div>
            </div>)
        }
        return(
           <div>{game}</div>
        )
    }
}