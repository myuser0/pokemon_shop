import React from 'react'
import './card.css';

export default function Card({id, name, price, type, picture, cartItems, setCartItems}) {
  
  name = name.charAt(0).toUpperCase() + name.slice(1);

  function addToCart() {
    let isNotOnCart = true;
    let newCartItems = [];

    cartItems.forEach(item => {
      if (item.id === id) {
        let newItem = {...item, quantity: item.quantity+1}
        newCartItems.push(newItem);
        isNotOnCart = false;
      } else {
        newCartItems.push(item);
      }
    })

    if(isNotOnCart) newCartItems.push({id, name, price, picture, quantity: 1});
    setCartItems(newCartItems);
  }

  return (
    <div className='pokemon_card'>
      <h3 style={{alignSelf: 'center'}}>{name}</h3>
      <img src={picture} alt='' />
      
      <div className="card_info">
        <div className="pokemon_details">
          <h5>Tipo: {type}</h5>
          <h4>${price}</h4>
        </div>

        <div className="card_button">
          <button className='add_to_cart' onClick={addToCart}>
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}



