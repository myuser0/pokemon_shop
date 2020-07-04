import React, { useState, useEffect } from 'react'
import './home.css';
import Card from '../Card';
// import Sidebar from '../Sidebar';
import MobileHeader from '../MobileHeader';
import axios from 'axios';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

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
    console.log(nextPage);
  }

  async function getPreviousPage() {
    await getApiData(previousPage);
  }

  async function getPokemonDetails(API_URL) {
    const api_result = await axios.get(API_URL);
    const pokemonDetails = await api_result.data;
    return pokemonDetails;
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
          let price = null;
          if (localStorage.getItem(pokemonDetails.id)) price = JSON.parse(localStorage.getItem(pokemonDetails.id)).price;
          else {
            price = Math.floor(Math.random() * 1000);
            localStorage.setItem(pokemonDetails.id, JSON.stringify({price}));
          }
          const pokemonWithDetails = {...pokemon, ...pokemonDetails, price};
          return pokemonWithDetails;
        })
      )

    setPokemonList(pokemonWithDetails);
  };

  useEffect(() => {
    getApiData(nextPage);
  }, [])


  return (
    <div className="shop">
      <MobileHeader cartItems={cartItems}></MobileHeader>

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
      
        <br></br>
        <div className="page_navigation">
          <button className="yellow_btn" onClick={getPreviousPage}>Previous Page</button>
          <button className="yellow_btn" style={{marginLeft: '15px'}} onClick={getNextPage}>Next Page</button>
        </div>
      </div>
      {/* <Sidebar cartItems={cartItems} setCartItems={setCartItems}></Sidebar> */}
    </div>
  )


  // return (
  //   <div className="shop">
  //     <div className="store_items_container">
  //       <div className="store_items">
  //           {pokemonList.map(({id, name, price, types, sprites}) => 
  //             <Card 
  //               id={id} 
  //               name={name} 
  //               price={price} 
  //               type={types[0].type.name} 
  //               picture={sprites.front_default}
  //               cartItems={cartItems}
  //               setCartItems={setCartItems}
  //               />
  //             )
  //           }
  //       </div>
      
  //       <br></br>
  //       <div>
  //         <button style={{marginLeft: '20px'}} onClick={getPreviousPage}>Previous Page</button>
  //         <button style={{marginLeft: '15px'}} onClick={getNextPage}>Next Page</button>
  //       </div>
  //     </div>
  //     <Sidebar cartItems={cartItems} setCartItems={setCartItems}></Sidebar>
  //   </div>
  // )


}
