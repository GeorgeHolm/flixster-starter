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






  return (
    <div id="forecast">
      <div className="flex-box">
        {results.map((res, idx) => (
          <MovieCard
            title={res.title}
            image={"https://image.tmdb.org/t/p/w500" + res.poster_path}
            rating={res.vote_average}
            key={idx}
            totalData={res}
            showModal={props.showModal}
            setModal={props.setModal}
          />
        ))}
      </div>

      <button id="loadMore" onClick={loadMore}>
        Load More
      </button>
    </div>
  );
};

export default MovieList;
