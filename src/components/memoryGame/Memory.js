import React, {Component} from 'react';
import uuid from 'react-uuid';
import './memory.css'
import MemoryCard from './MemoryCard';
import back from './RED_BACK.svg';
const Svgs = require.context('./memoryCards', true, /\.svg$/);
const paths = Svgs.keys();
const svg = paths.map(path => Svgs(path));


export default class Memory extends Component{
    constructor(props){
        super(props);

       this.state = {
           fullDeck: svg,
           gameCards:[],
           chosenCards: [],
           time:0,
           moves: 0,
           
       } 
       this.cardsFaceDown = this.cardsFaceDown.bind(this)
    }
    componentDidMount(){
        console.log(this.props.difficulty)
        let shuffledArray = this.state.fullDeck;
        //shuffle all cards
        for (let i = shuffledArray.length - 1; i > 0; i--){
            let ran = Math.floor(Math.random() * i);
            let temp = shuffledArray[i];
            shuffledArray[i] = shuffledArray[ran];
            shuffledArray[ran] = temp;
        }
        //this amount can be adjusted for difficulty
        let {difficulty} = this.props // this.props
        let amountOfCards;
        let boardSize;
        let cardWidth;
        let cardHeight;
        if (difficulty === "easy"){
            amountOfCards = 6; boardSize = '1fr 1fr 1fr 1fr'
            cardWidth = '130px'; cardHeight = '180px'
        }
        if (difficulty === "medium"){
            amountOfCards = 12; boardSize = '1fr 1fr 1fr 1fr 1fr 1fr'
            cardWidth = '87px'; cardHeight = '123px'
        }
        if (difficulty === "hard"){
            amountOfCards = 20; boardSize = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr'
            cardWidth = '71px'; cardHeight = '100px'
        }
        if (difficulty === "extreme"){
            amountOfCards = 52; boardSize = '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr '
            cardWidth = '48px'; cardHeight = '67px'
        }
        let cardsSelected = []
        for (let i = 0; i < amountOfCards; i++){
            cardsSelected.push(shuffledArray[i])
        }
        //adjust board accordingly
        //easy(4 colunms)medium(5 columns)hard(6 columns)
        document.getElementById('memoryGameBoard').style.gridTemplateColumns = boardSize;
        this.setState({cardHeight: cardHeight, cardWidth: cardWidth});
        //adjust card size accordingly
        //
        //duplicate array, shuffle again
        let cardsSelectedDoubled = [...cardsSelected,...cardsSelected];
        for (let i = cardsSelectedDoubled.length - 1; i > 0; i--){
            let ran = Math.floor(Math.random() * i);
            let temp = cardsSelectedDoubled[i];
            cardsSelectedDoubled[i] = cardsSelectedDoubled[ran];
            cardsSelectedDoubled[ran] = temp;
        }
        //add data to each card, set as state
        
        this.setState({gameCards: cardsSelectedDoubled.map((el, index)=>{
            //get cardvalue from its name 
            let beginningOfSlice = el.default.lastIndexOf('/') + 1;
            let endOfSlice = el.default.indexOf('.');
            let value = el.default.slice(beginningOfSlice, endOfSlice);
            let tempObj = {
                ...el,
                value: value
                ,front: el.default,
                back: back,
                id: uuid(),
            }
            return tempObj;
        })})

    }
    cardsFaceDown(){
        let allCards = Array.from(document.querySelectorAll('.memoryCard'));
        for (let i = 0; i < allCards.length; i++){
            allCards[i].style.transform = "none"
        }
    }
    render(){
        console.log(this.state)
        let {gameCards} = this.state
        return(
            <div id="memoryGameBoardContainer">
                <div id="memoryGameBoard">
                {gameCards.map((el, index)=>{
                    return(
                        <MemoryCard width={this.state.cardWidth} height={this.state.cardHeight} value={el.value} key={index} front={el.front} back={el.back} id={el.id}/>
                    )
                })}
              </div>
            </div>
        )


}
}