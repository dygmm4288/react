import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Movie.css";
const Movie = ({ year, title, summary, poster }) => {
	console.log(title);
	return (
		<>
			<div className="movie">
				<img src={poster} alt={title} title={title} />
				<div className="movie_data">
					<h3 className="movie_title">{title}</h3>
					<h5 className="movie_year">{year}</h5>
					<p className="movie_summary">{summary}</p>
				</div>
			</div>
		</>
	);
};
Movie.propTypes = {
	id: PropTypes.number.isRequired,
	year: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	summary: PropTypes.string.isRequired
	//poster: PropTypes.string.isRequired
};
export default Movie;
