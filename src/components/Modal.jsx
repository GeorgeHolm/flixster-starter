import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./Modal.css";
import { useState, useEffect } from "react";

export function Modal(props) {
  const [style, setStyle] = useState("overlay modalOpen");

  const changeStyle = () => {
    console.log("you just clicked");
    if (style !== "overlay modalOpen") setStyle("overlay modalOpen");
    else setStyle("overlay modalClosed");
  };

  if (style === "overlay modalOpen") {
    if (!props.isOpen) {
      changeStyle();
    }
  } else {
    if (props.isOpen) {
      changeStyle();
    }
  }
  //     Runtime in minutes
  // Backdrop poster
  // Release date
  // Genres
  // Overview

  const [movie, setMovie] = useState({});

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/" +
      props.currData.id +
      "?append_to_response=videos";
    console.log("The url: " + url);

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
        setMovie(res);
      }) //spread operator

      .catch((err) => console.error("error:" + err));
  }, [props.currData.id]);

  console.log(movie);

  //May need to make changes to genres

  return (
    <div className={style} onClick={() => props.onRequestClose()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="bottom">
          <span className="half">
            <h2>{movie.title}</h2>
            <img
              className="poster"
              src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            />
          </span>
          <span className="half">
            <button onClick={() => props.onRequestClose()}>Cancel</button>
            <p>Release Date: {movie.release_date}</p>
            <p>Overview: {movie.overview}</p>
            <div>
              <span>Genres: </span>
              {movie.genres?.map((res) => (
                <span>{res.name + " "}</span>
              ))}
            </div>
            <p>Runtime: {movie.runtime} Minutes</p>

            <div id="trailer">
              <iframe
                width="300"
                height="150"
                src={
                  "https://www.youtube.com/embed/" +
                  movie.videos?.results[0]?.key
                }
                title={movie.title}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Modal;
