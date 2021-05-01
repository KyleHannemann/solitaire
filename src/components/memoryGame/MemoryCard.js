import React, {Component} from 'react';

export default class MemoryCard extends Component{
    constructor(props){
        super(props)
        this.flipCard = this.flipCard.bind(this);
    }
    flipCard(e){
        if (this.props.flippable === false){
            return;
        }
       let card = e.target.parentNode;
       card.style.transform = "rotateY(180deg)";
       this.props.checkMatch(card.id, card.dataset.value)
       //check to make sure its not the same card
    }
    render(){
        let card;
        let {front, back, value, id, width, height, found} = this.props
        if (found === false){
            card = (<div className="memoryCardContainer" style={{height: height, width: width}}>
            <div id={id} onClick={this.flipCard} data-value={value}  className="memoryCard">
                <div className="memoryCardFront" style={{backgroundImage: `url(${back})`}}>

                </div>
                <div className="memoryCardBack" style={{backgroundImage: `url(${front})`}}>

                </div>
            </div>
        </div>)
        }
        else {
            card = ( <div className="memoryCardContainer" style={{height: height, width: width}}>
            <div id={id}  className="memoryCard">
                <div className="memoryCardFront" style={{backgroundImage: `url(${back})`, opacity: .3}}>

                </div>
                <div className="memoryCardBack" style={{backgroundImage: `url(${front})`, opacity: .3}}>

                </div>
            </div>
        </div>)
        }
        return(
            <div>{card}</div>
            
            
        )
    }
}