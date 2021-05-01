import React, {Component} from 'react';
import uuid from 'react-uuid';
import './memory.css'
import MemoryCard from './MemoryCard';
import MemoryGameDets from './MemoryGameDets';
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
           checkingMatch: false,
           matchesFound: 0,
           
       } 
       this.cardsFaceDown = this.cardsFaceDown.bind(this)
       this.checkMatch = this.checkMatch.bind(this)
       this.checkWin = this.checkWin.bind(this);
    }
    checkMatch(cardId, cardValue){
        
        if (this.state.checkingMatch === true){
            return;
        }
        this.setState({moves: this.state.moves + 1});
        if (this.state.chosenCards.length === 0){
            this.setState({chosenCards: [{id: cardId, value: cardValue}]})
        }
        else if (this.state.chosenCards.length === 1){
            this.setState({checkingMatch: true})
            setTimeout(()=>{
                let card1 = this.state.chosenCards[0];
                if(card1.value === cardValue && card1.id !== cardId){
                    let cardA = document.getElementById(card1.id)
                    let cardB = document.getElementById(cardId);
                    cardA.style.opacity = .2;
                    cardB.style.opacity = .2;
                    this.setState({checkingMatch: false, matchesFound: this.state.matchesFound + 1}
                        , ()=>this.checkWin())

                //matchFound
                }
                else{
                  this.setState({chosenCards: []})
                  this.cardsFaceDown()
                  this.setState({checkingMatch: false})

                }
            }, 1000)
           
        }
            //check to make sure not the same card
    }
    checkWin(){
        if (this.state.matchesFound === this.state.gameCards.length / 2){
            //gamewon
            console.log('win')
        }
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
                <MemoryGameDets moves={this.state.moves} returnHome={this.props.returnHome}/>
                <div id="memoryGameBoard">
                {gameCards.map((el, index)=>{
                    return(
                        <MemoryCard flippable={!this.state.checkingMatch} checkMatch={this.checkMatch} width={this.state.cardWidth} height={this.state.cardHeight} value={el.value} key={index} front={el.front} back={el.back} id={el.id}/>
                    )
                })}
              </div>
            </div>
        )


}
}