import React, {Component} from 'react'


export default class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            position: this.props.position
        }
        this.onDrop = this.onDrop.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
    }
    onDrop(e){
        const id = e.dataTransfer.getData('card');
        const card = document.getElementById(id);
        let child = card.firstChild;
        if (child){
            while(child.firstChild){
                child = child.firstChild;
            }
        }
        if(!child){child = card}
        const droppedOn = e.target;
       
        if(droppedOn.childNodes.length > 0 || droppedOn.id === child.id){
            return;
        }
        
        droppedOn.appendChild(card)
        e.dataTransfer.clearData();
        this.props.update(id, card.dataset.posistion, droppedOn.dataset.posistion)
        
        //this.props.upDate()TODO need a way to know what to update
        //can update directly in props when rendered inTableu/etc (posistion = "tableau")
        
      }
      onDragStart(e){
          console.log(e.target.dataset.posistion)
        e.dataTransfer.setData('card', e.target.id);
      }
      onDragOver(e){e.preventDefault()}

    render(){
        return(
            <div onDragOver={this.onDragOver}onDrop={this.onDrop}onDragStart={this.onDragStart}
             id={this.props.id} className="card" style={{backgroundImage: `url(${this.props.cardImage})`}} 
             data-posistion={this.props.posistion} draggable="true"></div>
        )
    }
}