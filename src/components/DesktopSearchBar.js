import React from 'react'
import './desktopSearchBar.css'

export default function DesktopSearchBar({handlePokemonSearch, setPokemonSearchInput, pokemonSearchInput}) {

  function handleEnterKey(e) {
    if(e.key === 'Enter') handlePokemonSearch();
  }

  return (
    <div style={{display: 'flex', padding: '15px 20px 0 20px'}}>
      <input onKeyPress={handleEnterKey} className="pokemon_search_input" onChange={e => setPokemonSearchInput(e.target.value)} value={pokemonSearchInput} placeholder="Digite o nome do Pokémon"/>
      <button className="search_button_desktop" onClick={handlePokemonSearch}>Pesquisar</button>
    </div>
  )
}
