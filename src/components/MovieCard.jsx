import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import './MovieCard.css'
import propTypes from 'prop-types';

const MovieCard = (props) => {

    const details = () => {
        console.log("Hello there");
        props.showModal(true);
        props.setModal(props.totalData);
    }



    return (
        <div className="movie" onClick={details}>
            <img className="poster" src={props.image}/>
            <h3>{props.title}</h3>
            <p>Rating: {props.rating}/10</p>
        </div>
    );

}

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
}

export default MovieCard;