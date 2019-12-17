import React, { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Star from "./Star.jsx";
import "./Movie.css";
const getStars = rating => {
	let stars = [];
	let starPoint = (5 * rating) / 10;
	const len = parseInt(starPoint);
	const fullStar = { isHalf: false, isEmpty: false };
	const halfStar = { isHalf: true, isEmpty: false };
	const emptyStar = { isHalf: false, isEmpty: true };
	for (let i = 0; i < len; i++) {
		stars.push(fullStar);
	}
	stars.push(starPoint - len >= 0.5 ? halfStar : emptyStar);
	return stars;
};
const Movie = ({ year, title, summary, poster, genres, rating }) => {
	const stars = useMemo(() => getStars(rating), []);
	const onClickEllipsis = () => {
		console.log("click eliipsis");
	};
	return (
		<>
			<div className="movie">
				<img src={poster} alt={title} title={title} />
				<div className="movie_data">
					<h3 className="movie_title">{title}</h3>
					<h5 className="movie_year">{year}</h5>
					<ul className="movie_genres">
						{genres.map((genre, index) => {
							return <li key={index}>{genre}</li>;
						})}
					</ul>
					<div className="movie_rating">
						{stars.map((star, index) => {
							return (
								<Star
									key={`${title} ${index}`}
									isHalf={star.isHalf}
									isEmpty={star.isEmpty}
								/>
							);
						})}
					</div>

					<p className="movie_summary">{summary.slice(0, 140)}...</p>
				</div>
				<a onClick={onClickEllipsis}>
					<i className="fas fa-ellipsis-v"></i>
				</a>
			</div>
		</>
	);
};
Movie.propTypes = {
	id: PropTypes.number.isRequired,
	year: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	summary: PropTypes.string.isRequired,
	poster: PropTypes.string.isRequired,
	genres: PropTypes.arrayOf(PropTypes.string).isRequired,
	rating: PropTypes.number.isRequired
};
export default Movie;
