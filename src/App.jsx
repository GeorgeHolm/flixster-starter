import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList';
import React from "react";
import Modal from './components/Modal';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [useLink, setUseLink] = useState("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=");
  let handleSearchChange = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearchQuery(lowerCase);
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



  //Modals stuff


  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState([]);
    
  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    console.log("Trying to close Modal");
    setModalIsOpen(false);
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
        <h1>Flixter</h1>
        <div>
          <span>
            <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" />
          </span>
          <span>
            <button onClick={commitSearch} >
              Search
            </button>
          </span>

          <span>
            <button onClick={commitNowPlaying} >
              Now Playing
            </button>
          </span>
        </div>
      </header>
      <main>
        <MovieList setModal={setModalData} showModal={setModalIsOpen} link={useLink}/>
      </main>
    </div>
  );
}

export default App
