import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList';
import React from "react";
import Modal from './components/Modal';




const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [useLink, setUseLink] = useState("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=");
  let handleSearchChange = (e) => {

    if(e.key === 'Enter') {
      e.preventDefault();
      console.log(e.target.value);
      var lowerCase = e.target.value.toLowerCase();
      setSearchQuery(lowerCase);
      setUseLink('https://api.themoviedb.org/3/search/movie?query=' + lowerCase + '&include_adult=false&language=en-US&page=');
    }

  }

  let commitSearch = () => {
    if (searchQuery === "") {
      setUseLink('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=');
    }
    else {
      setUseLink('https://api.themoviedb.org/3/search/movie?query=' + searchQuery + '&include_adult=false&language=en-US&page=');
    }

  }

  let commitNowPlaying = () => {
    setUseLink('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=');
  }

  let commitRating = () => {
    setUseLink('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=');
    console.log("Sorting by rating");
  }



  //Modals stuff


  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState([]);
  const [sideB, setSideB] = React.useState(false);

    
  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    console.log("Trying to close Modal");
    setModalIsOpen(false);
  }


  //select sort stuff


  const [filterChoice, setFilterChoice] = React.useState("default");

  function handleChange(e) {
    console.log(e.target.value);
    if (e.target.value === "none") {
      setUseLink('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=');//change to change at the lower level
      setFilterChoice("default");
    }
    else if (e.target.value === "bestAllTime") {
      setUseLink('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=');
      setFilterChoice("default");

    }
    else if (e.target.value === "best") {
      setFilterChoice("best");


    }
    else if (e.target.value === "worst") {
      setFilterChoice("worst");
    }
    else if (e.target.value === "comedy") {
      setFilterChoice("comedy");
    }
    else if (e.target.value === "horror") {
      setFilterChoice("horror");
    }
    else if (e.target.value === "drama") {
      setFilterChoice("drama");
    }
    else if (e.target.value === "action") {
      setFilterChoice("action");
    }
    else if (e.target.value === "az") {
      setFilterChoice("az");
    }
    else if (e.target.value === "za") {
      setFilterChoice("za");
    }

    
  }


  const sideBar = () => {
    setSideB(!sideB);

  }

  return (
    <div className="App">
      <Modal
            isOpen={modalIsOpen}
            currData={modalData}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          />
      <header>
            <h1 className='headLogo'>&#127871; Flixster &#127909;</h1>

        <div className=' flex'>
          

          <span className='margin'>
            <div className="box">
              <form id='minimize-form' name="search" value={searchQuery} onKeyDown={handleSearchChange}>
                  <input placeholder='&#127909;' type="text" className="input" name="txt"  onMouseOut="this.value = ''; this.blur();"/>
              </form>
            </div>
          </span>

          <span className='margin'>
            <button id='now-playing' onClick={commitNowPlaying} >
              Now Playing
            </button>
          </span>


          <span className='margin'>
            <button id='now-playing' onClick={sideBar} >
              Side Bar
            </button>
          </span>

          <span className='margin'>
            <select onChange={handleChange} className='sortClass' id='sort'>
              <option  value="none">None</option>
              <option  value="bestAllTime">Best of All Time</option>
              <option value="best">Best Now</option>
              <option value="worst">Worst Now</option>
              <option value="comedy">Comedies</option>
              <option value="horror">Horror</option>
              <option value="drama">Dramas</option>
              <option value="action">Action</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>




            </select>
          </span>
        </div>
      </header>
      <main>
        <MovieList filter={filterChoice} setModal={setModalData} showModal={setModalIsOpen} link={useLink} sideBar={sideB}/>
      </main>

      <footer>
        <span>All Rights Reserved | About: Flixter connects with the TMDB API to show movies. You can search, sort, and see more details on any movie you want. | </span>
        <span>
          <a href="https://www.linkedin.com/in/george-holm">Contact: LinkedIn</a>
        </span>
        
      </footer>
    </div>

  );
}

export default App
