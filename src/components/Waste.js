import React, {Component} from 'react';

export default class Waste extends Component{
    constructor(props){
        super(props);

        this.onDragStart = this.onDragStart.bind(this)
        this.moveToFoundation = this.moveToFoundation.bind(this);
    }
    onDragStart(e){
    e.dataTransfer.effectAllowed = "copyMove";

       
    this.props.flipCard(e.target.id, e.target.dataset.position)
    let data = {id: e.target.id, value: e.target.dataset.value, position: e.target.dataset.position, children: false}
    e.dataTransfer.setData('data', JSON.stringify(data));
    }
    moveToFoundation(e){
        //check to see if top CARD!!
        let foundationKey = {
            D: "diamonds",
            H: "hearts",
            C: "clubs",
            S: "spades"
        }
        let suit = e.target.dataset.value[e.target.dataset.value.length - 1]
        let whichFoundation = foundationKey[suit];
        let checkValid = this.checkValidDrop(e.target.dataset.value, this.props.foundationTopCard[whichFoundation].value)
        if (!checkValid){
            return;
        }
        else{
            this.props.update(e.target.id, e.target.dataset.position, this.props.foundationTopCard[whichFoundation].position , false);
        }
    }
    checkValidDrop(value, droppedOnId){
        if (droppedOnId === "foundationClubs"){
            if (value === "AC"){
                document.getElementById("foundationClubs").style.opacity = 1;

                return true;
            }
            else return false;
        }
        if (droppedOnId === "foundationDiamonds"){
            if (value === "AD"){
                document.getElementById("foundationDiamonds").style.opacity = 1;

                return true;
            }
            else return false;
        }
        if (droppedOnId === "foundationHearts"){
            if (value === "AH"){
                document.getElementById("foundationHearts").style.opacity = 1;
                return true;
            }
            else return false;
        }
        if (droppedOnId === "foundationSpades"){
            if (value === "AS"){
                document.getElementById("foundationSpades").style.opacity = 1;
                 return true;
            }
            else return false;
        }
        let newValue = {"A": 1, "0": 10, "J": 11, "Q": 12, "K": 13}
        let check = ["A","K","Q","J", "0"]
        let droppedOnValue = droppedOnId[droppedOnId.length - 2];
        
        if(check.includes(droppedOnValue) === true){droppedOnValue = newValue[droppedOnValue]}
        else{droppedOnValue = parseInt(droppedOnValue)};
        
        let droppedOnSuit = droppedOnId[droppedOnId.length -1];
        
        let dropValue = value[value.length - 2];
        
        if(check.includes(dropValue) === true){dropValue = newValue[dropValue]}
        
        else{dropValue = parseInt(dropValue)};
       
        let dropSuit = value[value.length - 1];
        if (dropSuit === "C"){
            if ((droppedOnSuit === "C") && (dropValue - droppedOnValue === 1)){
                    return true;
            }
            else{return false;} 
        }
        if (dropSuit === "D"){
            if ((droppedOnSuit === "D") && (dropValue - droppedOnValue === 1)){

                    return true;
            }
            else{return false;} 
        }
        if (dropSuit === "H"){
            if ((droppedOnSuit === "H") && (dropValue - droppedOnValue === 1)){
               
                return true;
            }
            else{return false;} 
        }
        if (dropSuit === "S"){
            if ((droppedOnSuit === "S") && (dropValue - droppedOnValue === 1)){
                return true;
            }
            else{return false;} 
        }
        
    
  }

    render(){
        let {cards} = this.props;
        let waste = cards.map(card=>
            {return(
                <div onDoubleClick={this.moveToFoundation} onDragStart={this.onDragStart} key={card.id} id={card.id} style={{backgroundImage: `url(${card.cardImage})`}}
           data-value={card.value} className="card" draggable={true} data-position={card.position}
           
           ></div>
            )})
        return(
            <div id="waste">{waste}</div>
        )
    }
}