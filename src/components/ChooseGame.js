import React, {Component} from 'react';


export default class ChooseGame extends Component{
constructor(props){
    super(props);

    this.state = {
        memoryDifficulty: "easy",
    }
    this.changeMemoryDifficulty = this.changeMemoryDifficulty.bind(this)
}
changeMemoryDifficulty(e){
    this.setState({memoryDifficulty: e.target.value}, ()=>{
        
    })

}


    render(){
//get props to start solitaire 
//get props to start memory with correct info
        return(
            <div id="chooseGameContainer">
        <div id="chooseGameReturnHome"onClick={this.props.returnHome}>Home</div>

        <div id="chooseGame">
            <h3>Solitaire</h3>
            <div onClick={this.props.solitaire}>Start Game</div>
            <h3>Memory</h3>
            <select onChange={this.changeMemoryDifficulty}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="extreme">Extreme</option>
            </select>
            <div onClick={()=>{this.props.memory(this.state.memoryDifficulty)}}>Start Game</div>
        </div>
        </div>
        )
    }
}