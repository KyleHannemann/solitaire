import Card from './Card';
import React, {Component} from 'react';

//Props: cards, backOfCard
//State:
//methods:
export default class TableauColumn extends Component{
    constructor(props){
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
    }
    onDrop(e){
        e.dataTransfer.dropEffect = "copy";
        let parent;
        if (e.target.dataset.id === "columnRoot"){parent = e.target;}
        else {parent = e.target.firstChild}
        let checkEmpty = parent.firstChild;
        if (checkEmpty){
            return;
        }
        let {id, value, position, children} =  JSON.parse(e.dataTransfer.getData('data'));
        if (value[0] !== "K"){
            return;
        }
        this.props.update(id, position, this.props.id, children);
    }
    onDragOver(e){
        e.preventDefault()
    }
    render(){
        let {cards, update, flipCard, foundationTopCard} = this.props;
        return(
            <div onDragOver={this.onDragOver} onDrop={this.onDrop} id={this.props.id} className="tableauColumn">
             <Card foundationTopCard={foundationTopCard} update={update} cards={cards} flipCard={flipCard}/>
            </div>
           
        )
        
    }
}