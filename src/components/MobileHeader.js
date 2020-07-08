import React, {useState, useEffect} from 'react'
import './MobileHeader.css'

export default function MobileHeader({cartItems, toggleMobileCart, handlePokemonSearch, setPokemonSearchInput, pokemonSearchInput}) {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    let count = 0;
    cartItems.forEach(item => {count += item.quantity});
    setCartItemsCount(count)
  }, [cartItems]);
  
  function handleEnterKey(e) {
    if(e.key === 'Enter') handlePokemonSearch();
  }
  
  return (
    <div className="mobile_header">
      <div className="header_search">
        <input onKeyPress={handleEnterKey} onChange={e => setPokemonSearchInput(e.target.value)} value={pokemonSearchInput} placeholder="Pokémon name" className="pokemon_search_input"/>
        <svg onClick={handlePokemonSearch} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="#fff" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
          <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
        </svg>
      </div>

      <div className="header_right" onClick={toggleMobileCart}>
        <div className="header_cart">
          <h4>{cartItemsCount}</h4>
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cart" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
