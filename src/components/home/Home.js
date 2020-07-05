import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './home.css';

import PokemonCatalogue from '../PokemonCatalogue';
import Sidebar from '../Sidebar';
import MobileHeader from '../MobileHeader';
import PageNavigation from '../PageNavigation';

export default function Home() {
  const initialCartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  const [pokemonList, setPokemonList] = useState([]);
  const [cartItems, setCartItems] = useState(initialCartItems);

  const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon/?limit=8');
  const [previousPage, setPreviousPage] = useState('https://pokeapi.co/api/v2/pokemon/?limit=8');

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
  }, [cartItems]);

  async function getNextPage() {
    await getApiData(nextPage);
  }

  async function getPreviousPage() {
    await getApiData(previousPage);
  }

  async function getPokemonDetails(API_URL) {
    const api_result = await axios.get(API_URL);
    const pokemonDetails = await api_result.data;
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
          const pokemonDetails = await getPokemonDetails(pokemon.url);
          let price = await definePokemonPrice(pokemonDetails.id);   
          const pokemonWithDetails = {...pokemon, ...pokemonDetails, price};
          return pokemonWithDetails;
        })
      )

    setPokemonList(pokemonWithDetails);
  };


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  let handleResize = (e) => {
    const windowWidth = window.innerWidth;
    setWindowWidth(windowWidth);
    // console.log('Window Width:', windowWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    getApiData(nextPage);
    return _ => {window.removeEventListener('resize', handleResize)}
  }, [])

  const [showCartMobile, setShowCartMobile] = useState(false);
  function toggleMobileCart() {
    showCartMobile ? setShowCartMobile(false) : setShowCartMobile(true);
  }

  return (
    <div className="shop">
      { windowWidth < 800 ?
        <MobileHeader cartItems={cartItems} toggleMobileCart={toggleMobileCart}></MobileHeader> : ''
      }

      {showCartMobile ? '' :
        <div style={{display: 'flex', flexDirection: 'column', flex: '1'}}>
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
