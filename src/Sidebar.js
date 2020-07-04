import React, {useState, useEffect} from 'react'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import './sidebar.css'

export default function Sidebar({cartItems, setCartItems}) {
  let [cartValue, setCartValue] = useState(0);

  function getTotalCartValue() {
    let cartTotalValue = 0;
    cartItems.forEach(item => {
      cartTotalValue += item.price;
    });

    setCartValue(cartTotalValue);
  }

  useEffect(() => {
    getTotalCartValue();
  }, []);

  return (
    <aside className="sidebar_cart">
      <div className="cart">
        <h2>Carrinho</h2>
        {(cartItems.length === 0) ? <p style={{marginTop: '10px', textAlign: 'center'}}>Carrinho vazio. Não gostou dos nossos Pokémon? :(</p> : null}
        <ul>
          <TransitionGroup className="pokemon_cart">
            {cartItems.map(({ id, name, price }) => (
              <CSSTransition
                in={cartItems}
                key={id}
                timeout={350}
                classNames="item"
              >
                <li>
                  <div className="cart_item_name">
                    <img src="#" alt=''/>
                    <p>{name} 1x</p>
                  </div>
                  <div className='cart_row_right'>
                    <p>${price}</p>
                    <button className="remove_button" onClick={() =>
                      setCartItems(cartItems =>
                        cartItems.filter(item => item.id !== id)
                      )}>
                      x
                    </button>
                  </div>
                </li>

                {/* </div> */}
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ul>
        <h4 style={{textAlign: "end", margin: '10px 5px 10px 0'}}>Total: ${cartValue}</h4> 
        { cartItems[0] ? <button id="proceed_checkout">Prosseguir para checkout</button> : ''}
      </div>


      {/* <button
        onClick={() => {
          const text = prompt('Enter some text');
          if (text) {
            setCartItems(items => [
              ...items,
              { id: Math.floor(Math.random() * 1000), text },
            ]);
          }
        }}
      >
        Add Item
      </button> */}

    </aside>




    // <aside className="sidebar_cart">
    //   <div className="cart">
    //     <h2>Carrinho</h2>
    //     <ul>
    //       <li>
    //         <div className="cart_item_name">
    //           <img src="#" alt=''/>
    //           <p>Pikachu 1x</p>
    //         </div>
    //         <div className='cart_row_right'>
    //           <p>$999</p>
    //           <button>Remover</button>
    //         </div>
    //       </li>
    //       <li>Charmander</li>
    //       <li>Meow</li>
    //       <li>Item 4</li>
    //       <li>
    //         <div className="cart_item_name">
    //           <p>Total</p>
    //         </div>
    //         <div className='cart_row_right'>
    //           <p>$999</p>
    //         </div>
    //       </li>
    //       <li>Item 4</li>
    //       <li>Item 4</li>
    //     </ul>
  
    //     <button id="proceed_checkout">Prosseguir para checkout</button>
    //   </div>
    // </aside>

  )
}
