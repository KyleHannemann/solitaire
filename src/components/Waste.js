import React, {Component} from 'react';

export default class Waste extends Component{
    constructor(props){
        super(props);

        this.onDragStart = this.onDragStart.bind(this)
    }
    onDragStart(e){
       
    this.props.flipCard(e.target.id, e.target.dataset.position)
    let data = {id: e.target.id, value: e.target.dataset.value, position: e.target.dataset.position, children: false}
    e.dataTransfer.setData('data', JSON.stringify(data));
    }

    render(){
        let {cards} = this.props;
        let waste = cards.map(card=>
            {return(
                <div  onDragStart={this.onDragStart} key={card.id} id={card.id} style={{backgroundImage: `url(${card.cardImage})`}}
           data-value={card.value} className="card" draggable={true} data-position={card.position}
           
           ></div>
            )})
        return(
            <div id="waste">{waste}</div>
        )
    }
}