import { useState } from 'react'
import './App.css'
import MovieList from './components/MovieList';

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Flixter</h1>
        <div>
          This is where the search bar and sort bar will be.
        </div>
      </header>
      <main>
        <MovieList/>

      </main>
    </div>
  );
}

export default App
