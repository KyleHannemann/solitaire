import React, {Component} from 'react';

export default class MemoryCard extends Component{
    constructor(props){
        super(props)
        this.flipCard = this.flipCard.bind(this);
    }
    flipCard(e){
       let card = e.target.parentNode;
       card.style.transform = "rotateY(180deg)";
    }
    render(){
        let {front, back, value, id, width, height} = this.props
        console.log(this.props)
        return(
            <div className="memoryCardContainer"  style={{height: height, width: width}}>
                <div onClick={this.flipCard} id={id}className="memoryCard">
                    <div className="memoryCardFront" style={{backgroundImage: `url(${back})`}}>

                    </div>
                    <div className="memoryCardBack" style={{backgroundImage: `url(${front})`}}>

                    </div>
                </div>
            </div>
            
        )
    }
}