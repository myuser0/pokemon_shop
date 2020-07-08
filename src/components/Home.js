import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './home.css';

import PokemonCatalogue from './PokemonCatalogue';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import PageNavigation from './PageNavigation';
import DesktopSearchBar from './DesktopSearchBar';

export default function Home() {
  const initialCartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  const pokemonApiBaseURL = 'https://pokeapi.co/api/v2/pokemon/';

  const [pokemonList, setPokemonList] = useState([]);
  const [cartItems, setCartItems] = useState(initialCartItems);

  const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon/?limit=8');
  const [previousPage, setPreviousPage] = useState('https://pokeapi.co/api/v2/pokemon/?limit=8');

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showCartMobile, setShowCartMobile] = useState(false);
  const [pokemonSearchInput, setPokemonSearchInput] = useState('');

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    getApiData(nextPage);
    return _ => {window.removeEventListener('resize', handleResize)}
  }, [])

  async function getNextPage() {
    await getApiData(nextPage);
  }

  async function getPreviousPage() {
    await getApiData(previousPage);
  }
    
  function toggleMobileCart() {
    showCartMobile ? setShowCartMobile(false) : setShowCartMobile(true);
  }
  
  let handleResize = (e) => {
    const windowWidth = window.innerWidth;
    setWindowWidth(windowWidth);
  };

  async function getPokemonDetails(API_URL) {
    const api_result = await axios.get(API_URL);

    let pokemonDetails = await api_result.data;
    let price = await definePokemonPrice(pokemonDetails.id);
    pokemonDetails = {...pokemonDetails, price};

    return pokemonDetails;
  }

  async function definePokemonPrice(pokemonId) {
    let price = 0;
    if (localStorage.getItem(pokemonId)){
      price = JSON.parse(localStorage.getItem(pokemonId)).price;
    } else {
      price = Math.floor(Math.random() * 1000);
      localStorage.setItem(pokemonId, JSON.stringify({price}));
    }
    return price;
  }

  async function getApiData(API_URL) {
    if(API_URL === null) return;

    const api_result = await axios.get(API_URL);
    const api_data = api_result.data;

    setNextPage(api_data.next);
    setPreviousPage(api_data.previous);

    const pokemonWithDetails = await Promise.all(
        api_data.results.map(async (pokemon) => {
          const pokemonWithDetails = await getPokemonDetails(pokemon.url);
          return pokemonWithDetails;
        })
      )

    setPokemonList(pokemonWithDetails);
  };

  function handlePokemonSearch() {
    if(pokemonSearchInput === '' || pokemonSearchInput === null) return;
    const searchTerm = pokemonSearchInput.toLowerCase();
    const searchUrl = pokemonApiBaseURL + searchTerm;
    searchPokemonByName(searchUrl);
  }

  async function searchPokemonByName(API_URL) {
    try {
      const api_result = await axios.get(API_URL);
      let pokemon = api_result.data;
      const price = await definePokemonPrice(pokemon.id);
      pokemon = {...pokemon, price};

      setPokemonList([pokemon]);

    } catch(error) {
      console.log('Deu ruim...')
    }
  }

  

  return (
    <div className="shop">
      { windowWidth < 800 ?
        <MobileHeader cartItems={cartItems} toggleMobileCart={toggleMobileCart} handlePokemonSearch={handlePokemonSearch} setPokemonSearchInput={setPokemonSearchInput} pokemonSearchInput={pokemonSearchInput}></MobileHeader> : ''
      }

      {showCartMobile && windowWidth < 800 ? '' :
        <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
          {windowWidth < 800 ? '' :
            <DesktopSearchBar handlePokemonSearch={handlePokemonSearch} setPokemonSearchInput={setPokemonSearchInput} pokemonSearchInput={pokemonSearchInput} />
          }
          <PokemonCatalogue pokemonList={pokemonList} cartItems={cartItems} setCartItems={setCartItems}/>
          <PageNavigation getNextPage={getNextPage} getPreviousPage={getPreviousPage} />
        </div>
      }

      {windowWidth >= 800 || showCartMobile ?
        <Sidebar cartItems={cartItems} setCartItems={setCartItems}></Sidebar> : ''
      }
    </div>
  )
}