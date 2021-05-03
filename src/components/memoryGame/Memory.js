import React, {Component} from 'react';
import uuid from 'react-uuid';
import './memory.css'
import MemoryCard from './MemoryCard';
import MemoryGameDets from './MemoryGameDets';
import back from './RED_BACK.svg';
const Svgs = require.context('./memoryCards', true, /\.svg$/);
const paths = Svgs.keys();
const svg = paths.map(path => Svgs(path));

let timer;
let rotatingCards;
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
           win: false,
           
       } 
       this.cardsFaceDown = this.cardsFaceDown.bind(this)
       this.checkMatch = this.checkMatch.bind(this)
       this.checkWin = this.checkWin.bind(this);
       this.foundMatch = this.foundMatch.bind(this)
       this.startGame = this.startGame.bind(this)
       this.logGame = this.logGame.bind(this)
       this.winGame = this.winGame.bind(this)
       this.startTime = this.startTime.bind(this)
    }
    foundMatch(cardsIdArr){
        for (let i = 0; i < cardsIdArr.length; i++){
            let card = document.getElementById(cardsIdArr[i]);
            let children = Array.from(card.childNodes);
            for (let j = 0; j < children.length; j++){
                
            }
        }
    }
    checkMatch(cardId, cardValue){
        
        if (this.state.checkingMatch === true){
            return;
        }
        if (this.state.chosenCards.length === 0){
            this.setState({moves: this.state.moves + 1});

            this.setState({chosenCards: [{id: cardId, value: cardValue}]})
            return;
        }
    
        else if (this.state.chosenCards.length === 1){
            if (this.state.chosenCards[0].id === cardId){
                return;
            }
            this.setState({moves: this.state.moves + 1});

            this.setState({checkingMatch: true})
            setTimeout(()=>{
                let card1 = this.state.chosenCards[0];
                if(card1.value === cardValue && card1.id !== cardId){
                    this.foundMatch([card1.id, cardId])
                    this.setState({checkingMatch: false, matchesFound: this.state.matchesFound + 1,
                    chosenCards: [], gameCards: this.state.gameCards.map(el=>{
                        if (el.id === card1.id || el.id === cardId){
                        let tempObj = {
                            ...el,
                            found: true,
                        }
                        return tempObj;
                    }
                        return el;
                    })}
                        , ()=>this.checkWin())

                //matchFound
                }
                else{
                  
                  this.setState({chosenCards: []})
                  //set array to one on same card
                  this.cardsFaceDown([card1.id, cardId])
                  console.log(card1.id, cardId)
                  this.setState({checkingMatch: false})

                }
            }, 1100)
           
        }
            //check to make sure not the same card
    }
    checkWin(){
        
        if (this.state.matchesFound === this.state.gameCards.length / 2){
            this.logGame(this.state.time, this.state.moves, true);
        }
        return;
    }
    winGame(){
        this.setState({win: true}, ()=>{this.winGameGraphic()
        })
        clearInterval(timer);
    }
    winGameGraphic(){
        let cards = document.querySelectorAll('.memoryCard');
        let speed = 45
        rotatingCards = setInterval(()=>{
            for (let i = 0; i < cards.length; i++){
                    cards[i].style.transform = `rotateY(${speed}deg)`
                    speed += 3;
            }
        }, 100)

    }
    logGame(time, moves, win){
        this.props.logGame("memory", time, moves, win, this.props.difficulty);
        this.winGame()
    }
    componentDidMount(){
       this.startGame()
       timer = setInterval(this.startTime, 1000)
    }
    startTime(){
        this.setState({time: this.state.time + 1});
    }
    componentWillUnmount(){
        clearInterval(timer)
        clearInterval(rotatingCards)
    }
    startGame(){
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
                found: false,
            }
            return tempObj;
        })})

    }
    cardsFaceDown(cardsIdArr){
        for (let i = 0; i < cardsIdArr.length; i++){
           document.getElementById(cardsIdArr[i]).style.transform = "none"
        }
    }
    render(){
        let {gameCards} = this.state;
        let gameBoard;
        if (this.state.win === false){
            gameBoard = ( <div id="memoryGameBoardContainer">
            <MemoryGameDets time={this.state.time}moves={this.state.moves} returnHome={()=>{
                this.logGame(this.state.time, this.state.moves, false);
                this.props.returnHome()}}/>
            <div id="memoryGameBoard">
            {gameCards.map((el, index)=>{
                return(
                    <MemoryCard found={el.found} flippable={!this.state.checkingMatch} checkMatch={this.checkMatch} width={this.state.cardWidth} height={this.state.cardHeight} value={el.value} key={index} front={el.front} back={el.back} id={el.id}/>
                )
            })}
          </div>
        </div>)
        }
        else{
            gameBoard = (
                <div id="memoryGameBoardContainer">
                    
                    <MemoryGameDets time={this.state.time} moves={this.state.moves} returnHome={()=>{
                this.props.returnHome()}}/>
                    <h1 style={{color: "white"}}>Well Played!</h1>
                <div id="memoryGameWinner">
                    {gameCards.map((el, index)=>{
                        if (index < 5){
                            return (<MemoryCard  width={this.state.cardWidth} height={this.state.cardHeight} value={el.value} key={index} front={el.front} back={el.back} id={el.id}/>)
                        }
                        else return null;
                    })}
                </div>
                </div>
            )
        }
        return(
            <div>
                {gameBoard}</div>
        )


}
}