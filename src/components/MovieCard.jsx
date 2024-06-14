import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./MovieCard.css";
import propTypes from "prop-types";
import { useState } from "react";

const MovieCard = (props) => {
  const [liked, setLiked] = React.useState(false);
  const [currHeart, setCurrHeart] = React.useState("🖤");

  const [watched, setWatched] = React.useState("📕");

  const details = (e) => {
    if (e.target.id !== "heart") {
      console.log("Hello there");
      props.showModal(true);
      props.setModal(props.totalData);
    }
  };

  const likeClicked = () => {
    setLiked(!liked);
    console.log(liked);

    if (liked) {
      setCurrHeart("❤️");
      props.ef(props.title);
    } else {
      setCurrHeart("🖤");
      props.rf(props.title);
    }
  };

  const watchClicked = () => {
    if (watched === "📕") {
      setWatched("📖");
      props.ew(props.title);
    } else {
      setWatched("📕");
      props.rw(props.title);
    }
  };

  return (
    <div className="movie" onClick={details}>
      <img alt="Poster for movie" className="poster" src={props.image} />
      <h3>{props.title}</h3>
      <p>Rating: {props.rating}/10</p>
      <div>
        <span id="heart" onClick={likeClicked}>
          {currHeart}{" "}
        </span>
        <span id="heart" onClick={watchClicked}>
          {watched}
        </span>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default MovieCard;
