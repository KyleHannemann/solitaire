import React, {Component} from 'react'
//props: cards, backofcard, 
//methods: flipcard, dragcard, dropcard, ondragover, checkvaliddrop
//state: ?faceup?


export default class Card extends Component{
    constructor(props){
        super(props);
        
        this.onDrop = this.onDrop.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.moveToFoundation = this.moveToFoundation.bind(this);
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
        let checkValid = this.checkValidDrop("foundation", e.target.dataset.value, this.props.foundationTopCard[whichFoundation].value)
        console.log(checkValid, e.target.dataset.value, this.props.foundationTopCard[whichFoundation].value)
        if (!checkValid){
            return;
        }
        else{
            this.props.update(e.target.id, e.target.dataset.position, this.props.foundationTopCard[whichFoundation].position , false);
        }
    }
    
    flipCard(e){
        e.stopPropagation();
        if (e.target.firstChild){
            return;
        }
       this.props.flipCard(e.target.id, e.target.dataset.position)
    }
    
    onDrop(e){
        e.dataTransfer.dropEffect = "copy";
        e.stopPropagation();
       
       let {id, value, position, children} =  JSON.parse(e.dataTransfer.getData('data'));
       let cardUnderValue = e.target.dataset.value;
       if (position === e.target.dataset.position){
           return;
       }
       
        let check = this.checkValidDrop(position, value, cardUnderValue);
        if (!check){
            return;
        }
        this.props.update(id, position, e.target.dataset.position, children)

        
        e.dataTransfer.clearData();
    }
    
    onDragStart(e){
        e.dataTransfer.effectAllowed = "copyMove";

        let children = false;
        if (e.target.firstChild){
            children = true;
        }
        e.stopPropagation();
        let data = {id: e.target.id, value: e.target.dataset.value, position: e.target.dataset.position, children: children}
        e.dataTransfer.setData('data', JSON.stringify(data));
    }
    
    onDragOver(e){e.preventDefault()}
    
    checkValidDrop(pos, dropId, droppedOnId){
        if (pos !== "foundation"){
            let newValue = {"A": 1, "0": 10, "J": 11, "Q": 12, "K": 13}
            let check = ["A","K","Q","J", "0"]
            let droppedOnValue = droppedOnId[droppedOnId.length - 2];
            if(check.includes(droppedOnValue) === true){droppedOnValue = newValue[droppedOnValue]}
            else{droppedOnValue = parseInt(droppedOnValue)};
            let droppedOnSuit = droppedOnId[droppedOnId.length -1];
            let dropValue = dropId[dropId.length - 2];
            if(check.includes(dropValue) === true){dropValue = newValue[dropValue]}
            else{dropValue = parseInt(dropValue)};
            let dropSuit = dropId[dropId.length - 1];
            if (dropSuit === "C" || dropSuit === "S"){
                if (droppedOnSuit === "C" || droppedOnSuit === "S"){
                    
                    return false
                   
                }
                else if (droppedOnValue - dropValue === 1){
                        
                    return true;
                }
                else{return false;} 
            }
            if (dropSuit === "H" || dropSuit === "D"){
                if (droppedOnSuit === "H" || droppedOnSuit === "D"){
                   return false;
                }
                else if (droppedOnValue - dropValue === 1){
                    return true;
                }
                else{return false;}
            }
        }
        if (pos === "foundation"){
            let value = dropId;
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
        
   }

    render(){
        let {cards} = this.props;
        let lastCard;
        if (cards.length === 1){
            lastCard = (<div onDoubleClick={this.moveToFoundation} onClick={this.flipCard} key={cards[0].id} id={cards[0].id} style={{backgroundImage: `url(${cards[0].image})`}}
            data-value={cards[0].value} className="card" draggable={cards[0].faceUp} data-position={cards[0].position}
            onDrop={this.onDrop} onDragOver={this.onDragOver} onDragStart={this.onDragStart}
            ></div>)
        }
        if (cards.length > 1){
           lastCard = (<div onDoubleClick={this.moveToFoundation} onClick={this.flipCard} key={cards[cards.length -1].id} id={cards[cards.length -1].id} style={{backgroundImage: `url(${cards[cards.length -1].image})`}}
           data-value={cards[cards.length -1].value} className="card" draggable={cards[cards.length - 1].faceUp} data-position={cards[cards.length -1].position}
           onDrop={this.onDrop} onDragOver={this.onDragOver} onDragStart={this.onDragStart}
           ></div>);
        }
        for (let i = cards.length - 2; i >= 0; i --){
           let nextCard = (<div onDoubleClick={this.moveToFoundation} onClick={this.flipCard} key={cards[i].id} id={cards[i].id} style={{backgroundImage: `url(${cards[i].image})`}}
           data-value={cards[i].value} className="card" draggable={cards[i].faceUp} data-position={cards[i].position}
           onDrop={this.onDrop} onDragOver={this.onDragOver} onDragStart={this.onDragStart}
           >{lastCard}</div>)
            lastCard = nextCard;
        }
        
        return (<div data-id="columnRoot">{lastCard}</div>)
    
}
}