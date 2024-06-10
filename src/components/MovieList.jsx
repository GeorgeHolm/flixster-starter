import React from "react";
import ReactDOM from "react-dom";
import Day from './MovieList';
import './MovieList.css'
import MovieCard from "./MovieCard";


const MovieList = (props) => {
    


fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));

    return (
        <div id="forecast">
            <div className="flex-box">
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />

               

            </div>


        </div>
    );

}

export default MovieList;