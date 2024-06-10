import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import './MovieCard.css'

const MovieCard = (props) => {

    const isWarm = props.temperature >=  60;
    return (
        <div className="day">
            <h3>Title</h3>
            <p>Poster image</p>
            <p>Rating</p>
        </div>
    );

}


MovieCard.PropTypes = {
    date: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    weather: PropTypes.string.isRequired,
};

export default MovieCard;