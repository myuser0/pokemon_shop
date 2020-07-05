import React from 'react'
import Card from './Card'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

export default function PokemonCatalogue({pokemonList, getNextPage, getPreviousPage, cartItems, setCartItems}) {
  return (
    <div className="store_items_container">
        <TransitionGroup >
          <div className="store_items">
            {pokemonList.map(({id, name, price, types, sprites}) => 
              <CSSTransition
                in={pokemonList}
                key={id}
                timeout={{
                  enter: 350,
                  exit: 0
                }}
                classNames="pokemonItem"
              >
                <Card 
                  id={id} 
                  name={name} 
                  price={price} 
                  type={types[0].type.name} 
                  picture={sprites.front_default}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              </CSSTransition>
              )
            }
          </div>
        </TransitionGroup>
      </div>
  )
}