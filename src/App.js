import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import TableauColumn from './components/TableauColumn';
import backOfCard from './components/BLUE_BACK.svg';
import Foundation from './components/Foundation';
import GameDets from './components/GameDets';
import Stock from './components/Stock';
import Waste from './components/Waste';

const reqSvgs = require.context('./cards', true, /\.svg$/)
const paths = reqSvgs.keys();
const svg = paths.map(path => reqSvgs(path))
for (let i = 0; i < svg.length; i++){
  let findVal = svg[i].default;
  let start = findVal.lastIndexOf("/");
  let end = findVal.indexOf(".");
  let value = findVal.slice(start + 1, end);
  svg[i].value = value;
  svg[i].position = "";
  svg[i].faceUp = false;
  svg[i].cardImage = svg[i].default;
  svg[i].back = backOfCard;
  svg[i].image = svg[i].back
}

//State: cards, stock, tableau columns 1-7, waste, foundation, moves, history, ?time, 
//Methods: update states above, update history, updatemoves, shuffle
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards: svg,
      stock: [],
      tableau1: [],
      tableau2: [],
      tableau3: [],
      tableau4: [],
      tableau5: [],
      tableau6: [],
      tableau7: [],
      waste: [],
      foundationDiamonds: [],
      foundationHearts: [],
      foundationSpades: [],
      foundationClubs: [],
      moves: 0,
      time: 0,//TODO
      history: [],
      username: '',//TODO

    }
   this.update = this.update.bind(this);
   this.flipCard = this.flipCard.bind(this);
   this.undo = this.undo.bind(this)
   this.resetStock = this.resetStock.bind(this)
   this.startTime = this.startTime.bind(this)
   this.startGame = this.startGame.bind(this)
  }
  startGame(){//TODO
    let timer = setInterval(this.startTime, 1000)
  }
  startTime(){
    this.setState({time: this.state.time + 1}, ()=>console.log(this.state.time))
  }
  componentDidMount(){
    this.shuffle();
  

  }
  resetStock(){
    this.setState({moves: this.state.moves + 1})
    this.setState({stock: this.state.waste.reverse().map(
      card=>{card.faceUp = false; return card;}
    )});
    this.setState({waste: []});
  }
  undo(){
    this.setState({moves: this.state.moves + 1})
    let {stock, tableau1, tableau2, tableau3, tableau4, tableau5, tableau6, tableau7,
    waste, foundationClubs, foundationDiamonds, foundationHearts, foundationSpades} = this.state.history[this.state.history.length - 1];
    
    this.setState({stock: stock, tableau1: tableau1, tableau2: tableau2, tableau3: tableau3, 
      tableau4: tableau4, tableau5: tableau5, tableau6: tableau6, tableau7: tableau7,
      waste: waste, foundationClubs: foundationClubs, foundationDiamonds: foundationDiamonds, 
      foundationHearts: foundationHearts, foundationSpades: foundationSpades});
      this.setState({history: this.state.history.filter((el, index, arr)=>
      {if(index < arr.length -1){return el}})})
    console.log(this.state.history)
  }
  shuffle(){
    let array = this.state.cards;
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp;
    }
    for (let i = 0; i < array.length; i++){array[i].id = i}
    this.setState({cards: array})
    this.setState({stock: array.filter((card, index)=>index < 24)
    .map(card=>{card.position = "stock"; return card})});
    let start = 24;
    for (let i = 1; i < 8; i++){
      let arr = [];
      for (let j = 0; j < i; j++){
          if (j === i - 1){
            array[start].image = array[start].cardImage;
            array[start].faceUp = true;
          
          }
          arr.push(array[start]);
          start++;
      }
      let iAsStr = i + "";
      let state = "tableau"+iAsStr;
      let arrWithPositions = arr.map(card=>{card.position = state; return card})
      this.setState({[state]: arrWithPositions});
      let newMove = [this.state];
      this.setState({history: this.state.history.concat(newMove)})
    }
    

  }
  flipCard(id, position){
    this.setState({[position]: this.state[position].map(card=>{
      if (card.id === parseInt(id)){
        card.image = card.cardImage;
        card.faceUp = true;
      }
      return card;
    })})

  }
  update(cardId, oldPosition, newPosition, children){
    this.setState({moves: this.state.moves + 1}, ()=>console.log(this.state.moves))
    let newMove = [this.state];
    this.setState({history: this.state.history.concat(newMove)});

  if (children === false){
    
   this.setState({[oldPosition]: this.state[oldPosition].filter(card=>card.id != cardId)});
   this.setState({[newPosition]: this.state[newPosition].concat([this.state.cards[cardId]])
    .map(card=>{card.position = newPosition; return card;})})
  } 
  else {
    let findIndex = this.state[oldPosition];
    let startIndex;
    for (let i = 0; i < findIndex.length; i++){if (findIndex[i].id === parseInt(cardId)){startIndex = i}}
    this.setState({[oldPosition]: this.state[oldPosition].filter((card, index)=>
    {if (index < startIndex){return card;}})});
    let arr = this.state[oldPosition].slice(startIndex);
    this.setState({[newPosition]: this.state[newPosition].concat(arr)
      .map(card=>{card.position = newPosition; return card;})});
  }
  }
  
  render() {
    
    return(
      <div>
        <button onClick={this.undo}>UNDO</button>
      <GameDets moves={this.state.moves} time={this.state.time}/>
      <div id="container1">
      <Stock cards={this.state.stock}  update={this.update} resetStock={this.resetStock}/>
      <Waste cards={this.state.waste} update={this.update} flipCard={this.flipCard}/>
      <Foundation id="foundationHearts"  cards={this.state.foundationHearts}  update={this.update} />
      <Foundation id="foundationSpades" cards={this.state.foundationSpades} update={this.update} />
      <Foundation id="foundationDiamonds" cards={this.state.foundationDiamonds} update={this.update} />
      <Foundation id="foundationClubs" cards={this.state.foundationClubs} update={this.update} />
      
      </div>
      <div id="tableau">
        <TableauColumn id="tableau1"cards={this.state.tableau1}   update={this.update} flipCard={this.flipCard}/>
        <TableauColumn id="tableau2"cards={this.state.tableau2}  update={this.update} flipCard={this.flipCard}/>
        <TableauColumn id="tableau3"cards={this.state.tableau3} update={this.update} flipCard={this.flipCard}/>
        <TableauColumn id="tableau4"cards={this.state.tableau4} update={this.update} flipCard={this.flipCard}/>
        <TableauColumn id="tableau5"cards={this.state.tableau5} update={this.update} flipCard={this.flipCard}/>
        <TableauColumn id="tableau6"cards={this.state.tableau6} update={this.update} flipCard={this.flipCard}/>
        <TableauColumn id="tableau7"cards={this.state.tableau7} update={this.update} flipCard={this.flipCard}/>
      </div>
      </div>
    )
  }
}

export default App;
