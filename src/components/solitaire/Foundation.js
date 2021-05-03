import React, {Component} from 'react';
import cardToFoundationSound from './cardToFoundation.mp3';
export default class Foundation extends Component{
    constructor(props){
        super(props)

        this.onDragStart = this.onDragStart.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.checkValidDrop = this.checkValidDrop.bind(this)
    }
    checkValidDrop(pos, value, droppedOnId){
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
    onDragStart(e){
       
        let data = {id: e.target.id, value: e.target.dataset.value, position: e.target.dataset.position, children: false}
        e.dataTransfer.setData('data', JSON.stringify(data));
        }
        onDrop(e){
            e.dataTransfer.dropEffect = "copy";
            e.stopPropagation();
           let {id, value, position, children} =  JSON.parse(e.dataTransfer.getData('data'));
           let cardUnderValue = e.target.dataset.value;
           console.log(id, value, position, children)
           if (children === true){
               return;
           }
           let checkValid = this.checkValidDrop(position, value, cardUnderValue)
           console.log(checkValid)
           if (!checkValid){
               return;
           }
            this.props.update(id, position, this.props.id , children);
            let sound = document.getElementById('cardToFoundationSound');
            sound.currentTime = 0;
            sound.play();

    
            
            e.dataTransfer.clearData();
        }

    render(){
        let {id, cards} = this.props;
        let foundation = cards.map(card=>{
            return (<div 
             onDragOver={(e)=>{e.preventDefault()}} onDrop={this.onDrop}  onDragStart={this.onDragStart} key={card.id} id={card.id} style={{backgroundImage: `url(${card.cardImage})`}}
           data-value={card.value} className="card" draggable={true} data-position={card.position}
           > </div>)
        })
        return(
            <div id={id} data-value={id} onDragOver={(e)=>{e.preventDefault()}} onDrop={this.onDrop} className="foundation">
                <audio id="cardToFoundationSound">
                    <source src={cardToFoundationSound}></source>
                    </audio>{foundation}</div>
        )
    }
}