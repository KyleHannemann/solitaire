import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Card from './components/Card';
import backOfCard from './components/BLUE_BACK.svg';
const reqSvgs = require.context('./cards', true, /\.svg$/)
const paths = reqSvgs.keys();
const svg = paths.map(path => reqSvgs(path))
for (let i = 0; i < svg.length; i++){
  let findVal = svg[i].default;
  let start = findVal.lastIndexOf("/");
  let end = findVal.indexOf(".");
  let value = findVal.slice(start + 1, end);
  svg[i].id = value;
  svg[i].posistion = "hello";
  svg[i].faceUp = false;
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards: svg,
      stock: [],
      tableau: [],
      waste: [],
      foundation: [],
      time: '',//TODO
      moves: 0,//TODO
      history: [],//TODO

    }
   this.update = this.update.bind(this)
  }
  componentDidMount(){
    this.shuffle();
  }
  shuffle(){
    let array = this.state.cards;
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp;
    }
    this.setState({ stock: array.filter((item, index)=>{return index < 24}).forEach(el=>el.posistion = "stock")})
    let tableau = [];
    let start = 24;
    for (let i = 1; i < 8; i++){
      let column = []
      for (let j = 0; j < i; j++){
        array[start].posistion = "tableau"
          column.push(array[start]);
          
          start += 1;
      }
      tableau.push(column);
    }
    this.setState({tableau: tableau})
    this.setState({cards: array})
  }
  update(card, Oldposistion, newPosistion){
      console.log(card, Oldposistion, newPosistion)
  }
  
  render() {
      console.log(this.state.cards)
    return(
      <div>
        {this.state.cards.map(card=>{
          return(
            <Card update={this.update}id={card.id} posistion={card.posistion} cardImage={card.default} />
          )
        })}
        <div id="pract" onDragOver={this.onDragOver}onDrop={this.onDrop}></div>
      </div>
    )
  }
}

export default App;
