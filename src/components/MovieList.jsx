import React from "react";
import ReactDOM from "react-dom";
import Day from "./MovieList";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";

const MovieList = (props) => {
  const [results, setResults] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const[propsLink, setPropsLink] = useState(props.link);
  const[favoriteMovies, setFavoriteMovies] = useState([]);
  const[watchedMovies, setWatchedMovies] = useState([]);


  useEffect(() => {
    handlePropsLink();
    const url = props.link + nextPage;
    console.log("The url: " + props.link);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2VhOTlkYWU0YjQwNDQyMjBkMmIxMjVmMzU3NjZmZSIsInN1YiI6IjY2Njc2NTVkOTE0Yjg4OTA3YWU5ZGMyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eSvsVo-wdaKFn9dlByTAdXz2xkX4vci0OOLKSZoX0y0",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        if (nextPage === 1) {
          setResults(res.results);
        } else {
          setResults((prevState) => [...prevState, ...res.results]);

        }
      }) //spread operator

      .catch((err) => console.error("error:" + err));
  }, [nextPage, props.link]);

  const loadMore = () => {
    setNextPage((nPage) => nPage + 1);
  };


  const handlePropsLink = () => {
    if (propsLink !== props.link) {
        setNextPage(1);
    }
    setPropsLink(props.link);
  }


  const filterMovies = (filter) => {

    const fR = results.filter((movie, idx, self) => self.findIndex(i => i.title === movie.title) === idx);

    if (filter === "default") {
        return fR;
    }
    else if(filter === "best") {
        return fR.filter(movie => movie.vote_average >= 7);
    }
    else if(filter === "worst") {
        return fR.filter(movie => movie.vote_average <= 5);
    }
    else if(filter === "comedy") {
        return fR.filter(movie => movie.genre_ids?.some((id) => id === 35));
    }
    else if(filter === "action") {
        return fR.filter(movie => movie.genre_ids?.some((id) => id === 28));
    }
    else if(filter === "drama") {
        return fR.filter(movie => movie.genre_ids?.some((id) => id === 18));
    }
    else if(filter === "horror") {
        return fR.filter(movie => movie.genre_ids?.some((id) => id === 27));
    }
    else if(filter === "az") {
        return fR.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });
    }
    else if(filter === "za") {
        return fR.sort((a, b) => {
            if (b.title < a.title) return -1;
            if (b.title > a.title) return 1;
            return 0;
          });    }
  };

  const filteredResults = filterMovies(props.filter);



  //favorite movies

  const editFavorites = (movie) => {
    setFavoriteMovies((prevState) => [...prevState, movie]);
  }

  const removeFavorites = (movie) => {

        setFavoriteMovies(favoriteMovies => favoriteMovies.filter(key => key !== movie));
  }

  const editWatched = (movie) => {
    setWatchedMovies((prevState) => [...prevState, movie]);
  }

  const removeWatched = (movie) => {

        setWatchedMovies(favoriteMovies => favoriteMovies.filter(key => key !== movie));
  }


  return (
    <div id="large-container">
    <div id="movies">
      <div className="flex-box">
        {filteredResults.map((res, idx) => (
          <MovieCard
            title={res.title}
            image={"https://image.tmdb.org/t/p/w500" + res.poster_path}
            rating={res.vote_average}
            key={idx}
            totalData={res}
            showModal={props.showModal}
            setModal={props.setModal}
            ef={editFavorites}
            rf={removeFavorites}
            ew={editWatched}
            rw={removeWatched}
          />
        ))}
      </div>

      <button id="loadMore" onClick={loadMore}>
        Load More
      </button>
    </div>
    <div id="side-bar">
        <h2 className="side-header">
            Favorites
            
        </h2>

        {favoriteMovies.map((name) => (<p>{name}</p>))}

        <h2 className="side-header">
            Watched
            
        </h2>

        {watchedMovies.map((name) => (<p>{name}</p>))}
    </div>
    </div>

  );
};

export default MovieList;
