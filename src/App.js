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
let timer;

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
      time: 0,
      history: [],
      win: false,

    }
   this.update = this.update.bind(this);
   this.flipCard = this.flipCard.bind(this);
   this.undo = this.undo.bind(this)
   this.resetStock = this.resetStock.bind(this)
   this.startTime = this.startTime.bind(this)
   this.startGame = this.startGame.bind(this)
   this.winGame = this.winGame.bind(this);
   this.newGame = this.newGame.bind(this);
   this.logGame = this.logGame.bind(this);
   this.returnHome = this.returnHome.bind(this);
  }
  returnHome(){
    this.logGame(false);
    this.props.returnHome();
  }
  componentWillUnmount(){
    clearInterval(timer);
  }
  logGame(checkWin){
    this.props.logGame(this.state.time, this.state.moves, checkWin);
    
  }
  newGame(){
    clearInterval(timer);
    this.logGame(false);
    this.setState({ cards: svg.map(el=>{el.image = el.back; return el}),
      stock: [],tableau1: [],tableau2: [],tableau3: [],tableau4: [],
      tableau5: [],tableau6: [],tableau7: [],waste: [],
      foundationDiamonds: [],foundationHearts: [],foundationSpades: [],
      foundationClubs: [],moves: 0,time: 0, history: [],}, ()=>{
        this.startGame()});
  }
  winGame(){
    this.setState({win: true});
    clearInterval(timer)
    let cards = document.querySelectorAll('.card');
    console.log(cards)
    
   setTimeout(function(){
      let rainingCards = document.querySelectorAll('.rainingCard');
      console.log(rainingCards)
      function raindown(){
        for (let i = 0; i < rainingCards.length; i++){
          let speed = rainingCards[i].dataset.speed;
          let bottom = rainingCards[i].style.bottom;
          let number = bottom.slice(0, bottom.length - 2);
          let newBottom = parseInt(number) - speed;
          rainingCards[i].style.bottom = `${newBottom}px`;
          if (newBottom < window.innerHeight - window.innerHeight - 200){
              rainingCards[i].style.bottom = `${window.innerHeight}px`;
          }
         
        }
        
      }
      let rain = setInterval(raindown, 100)
      setTimeout(function(){clearInterval(rain)}, 25000)
    }, 100)
 
  
  }
  componentDidMount(){
    this.startGame();
  }
  startGame(){
    console.log();
    this.shuffle();
    timer = setInterval(this.startTime, 1000)
    
  }
  startTime(){
    this.setState({time: this.state.time + 1})
  }
  
  resetStock(){
    this.setState({moves: this.state.moves + 1})
    this.setState({stock: this.state.waste.reverse().map(
      card=>{card.faceUp = false; return card;}
    )});
    this.setState({waste: []});
  }
  undo(){
    if (this.state.history.length < 2){
      return;
    }
    this.setState({moves: this.state.moves + 1})
    //check to see if only a card flip
    if (!this.state.history[this.state.history.length - 1].cards){
      let {position, id}  = this.state.history[this.state.history.length - 1];
      this.setState({[position]: this.state[position].map(el=>{if(el.id === parseInt(id)){el.faceUp = false; el.image = el.back}return el;}),
      history: this.state.history.filter((el, index, arr)=>
      {if(index < arr.length -1){return el}else{return false;}}
      )});
      console.log("card flip")
      return;
    }
    let {stock, tableau1, tableau2, tableau3, tableau4, tableau5, tableau6, tableau7,
    waste, foundationClubs, foundationDiamonds, foundationHearts, foundationSpades} = this.state.history[this.state.history.length - 1];
    
    this.setState({stock: stock.map(el=>{el.position = "stock"; el.faceUp = false; return el}), tableau1: tableau1.map(el=>{el.position = "tableau1"; return el}), tableau2: tableau2.map(el=>{el.position = "tableau2"; return el}), 
    tableau3: tableau3.map(el=>{el.position = "tableau3"; return el}), tableau4: tableau4.map(el=>{el.position = "tableau4"; return el}), tableau5: tableau5.map(el=>{el.position = "tableau5"; return el}), tableau6: tableau6.map(el=>{el.position = "tableau6"; return el}), tableau7: tableau7.map(el=>{el.position = "tableau7"; return el}),
      waste: waste.map(el=>{el.position = "waste"  ; el.faceUp = true ; return el}), foundationClubs: foundationClubs.map(el=>{el.position = "foundationClubs" ; el.faceUp = true ; return el}), foundationDiamonds: foundationDiamonds.map(el=>{el.position = "foundationDiamonds" ; el.faceUp = true ; return el}), 
      foundationHearts: foundationHearts.map(el=>{el.position = "foundationHearts" ; el.faceUp = true ; return el}), foundationSpades: foundationSpades.map(el=>{el.position = "foundationSpades" ; el.faceUp = true ; return el})});
      
      this.setState({history: this.state.history.filter((el, index, arr)=>
      {if(index < arr.length -1){return el}else{return false;}}
      )});
    
   
  }
  shuffle(){
    console.log("hi")
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
    if (position !== "waste"){
    this.setState({history: this.state.history.concat([{id: id, position : position}])})
    }
    //push the card index to the history arr, then When going throught the history
    //if come across simgle card, I know all i need to do is reverse that card..)
    this.setState({[position]: this.state[position].map(card=>{
      if (card.id === parseInt(id)){
        card.image = card.cardImage;
        card.faceUp = true;
      }
      return card;
    })})

  }
  update(cardId, oldPosition, newPosition, children){
    this.setState({moves: this.state.moves + 1})
    let newMove = [this.state];
    this.setState({history: this.state.history.concat(newMove)}, ()=>console.log(this.state.history));

  if (children === false){
    
   this.setState({[oldPosition]: this.state[oldPosition].filter(card=>card.id !== parseInt(cardId))});
   this.setState({[newPosition]: this.state[newPosition].concat([this.state.cards[cardId]])
    .map(card=>{card.position = newPosition; return card;})}, ()=>this.checkWin())
  } 
  else {
    let findIndex = this.state[oldPosition];
    let startIndex;
    for (let i = 0; i < findIndex.length; i++){if (findIndex[i].id === parseInt(cardId)){startIndex = i}}
    this.setState({[oldPosition]: this.state[oldPosition].filter((card, index)=>
    {if (index < startIndex){return card;}else{return false;}})});
    let arr = this.state[oldPosition].slice(startIndex);
    this.setState({[newPosition]: this.state[newPosition].concat(arr)
      .map(card=>{card.position = newPosition; return card;})}, ()=>{this.checkWin()});
  }
}
  checkWin(){
    let {foundationClubs, foundationDiamonds, foundationHearts, foundationSpades} = this.state;
    if (foundationClubs.length === 13 && foundationDiamonds.length === 13 && foundationHearts.length === 13 && foundationSpades.length === 13){
      this.winGame();
      return;
    }
     else {
      return;
    }

  }
  
  render() {
    
    let hearts = {position:"foundationHearts", value: "foundationHearts"};
    if (this.state.foundationHearts.length > 0){
      hearts = this.state.foundationHearts[this.state.foundationHearts.length - 1]
    }
    let diamonds = {position:"foundationDiamonds", value: "foundationDiamonds"};
    if (this.state.foundationDiamonds.length > 0){
      diamonds = this.state.foundationDiamonds[this.state.foundationDiamonds.length - 1]
    }
    let spades = {position:"foundationSpades", value: "foundationSpades"};
    if (this.state.foundationSpades.length > 0){
      spades = this.state.foundationSpades[this.state.foundationSpades.length - 1]
    }
    let clubs = {position:"foundationClubs", value: "foundationClubs"};
    if (this.state.foundationClubs.length > 0){
      clubs = this.state.foundationClubs[this.state.foundationClubs.length - 1]
    }
    let foundationTopCard = {
      hearts: hearts,
      diamonds: diamonds,
      spades: spades,
      clubs: clubs
    }

    let game = []
    let rainingCards = [];
    if (this.state.win === false){ game = (  <div>
      <GameDets returnHome={this.returnHome} newGame={this.newGame} moves={this.state.moves} time={this.state.time} undo={this.undo}/>
      <div id="container1">
      <Stock cards={this.state.stock}  update={this.update} resetStock={this.resetStock}/>
      <Waste foundationTopCard={foundationTopCard} update={this.update} cards={this.state.waste} update={this.update} flipCard={this.flipCard}/>
      <Foundation id="foundationHearts"  cards={this.state.foundationHearts}  update={this.update} />
      <Foundation id="foundationSpades" cards={this.state.foundationSpades} update={this.update} />
      <Foundation id="foundationDiamonds" cards={this.state.foundationDiamonds} update={this.update} />
      <Foundation id="foundationClubs" cards={this.state.foundationClubs} update={this.update} />
      
      </div>
      <div id="tableau">
        <TableauColumn foundationTopCard={foundationTopCard}  id="tableau1"cards={this.state.tableau1}   update={this.update} flipCard={this.flipCard}/>
        <TableauColumn foundationTopCard={foundationTopCard} id="tableau2"cards={this.state.tableau2}  update={this.update} flipCard={this.flipCard}/>
        <TableauColumn foundationTopCard={foundationTopCard} id="tableau3"cards={this.state.tableau3} update={this.update} flipCard={this.flipCard}/>
        <TableauColumn foundationTopCard={foundationTopCard} id="tableau4"cards={this.state.tableau4} update={this.update} flipCard={this.flipCard}/>
        <TableauColumn foundationTopCard={foundationTopCard} id="tableau5"cards={this.state.tableau5} update={this.update} flipCard={this.flipCard}/>
        <TableauColumn foundationTopCard={foundationTopCard} id="tableau6"cards={this.state.tableau6} update={this.update} flipCard={this.flipCard}/>
        <TableauColumn foundationTopCard={foundationTopCard} id="tableau7"cards={this.state.tableau7} update={this.update} flipCard={this.flipCard}/>
      </div>
      </div>)}
      else if (this.state.win === true){
      let cards = []
      for (let i = 0; i < 2; i++){
        for (let j = 0; j < svg.length; j++){
          let card = svg[j];
          card.z = Math.floor(Math.random() * 100);
          card.speed = Math.floor(Math.random() * 8 + 4);
          card.bottom = window.innerHeight;
          card.left = Math.floor(Math.random() * window.innerWidth - 30)
          cards.push(card);
        }
      }
      rainingCards = cards.map((el, index)=>{
        let style = {
          backgroundImage: `url(${el.cardImage})`,
          zIndex: el.z,
          left: `${el.left}px`,
          bottom: `${el.bottom}px`,
          
        }
        return(
          <div key={index} data-speed={el.speed} style={style}id={index} className="rainingCard"></div>
        )
      })
  
       
      }
    return(
      <div>
      {game}
      {rainingCards}
      </div>
    )
  }
}

export default App;
