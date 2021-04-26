import React, { Component} from 'react';


export default class Stock extends Component{
    constructor(props){
        super(props)

        this.flipCard = this.flipCard.bind(this)
    }
    flipCard(e){
        if (e.target.id === "reset"){
            this.props.resetStock();
            return;
        }
        e.stopPropagation();
       this.props.update(e.target.id, "stock", "waste", false)
    }

    render(){
        let {cards} = this.props;
        let stock = cards.map(card=>
            {return(
                <div onClick={this.flipCard} key={card.id} id={card.id} style={{backgroundImage: `url(${card.back})`}}
           data-value={card.value} className="card" draggable={card.faceUp} data-position={card.position}
           
           ></div>
            )})
        
        return(
            <div id="stock">
                <div id="reset" onClick={this.flipCard}>Reset</div>
                {stock}</div>
        )
    }
}