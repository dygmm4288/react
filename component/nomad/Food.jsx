import React from "react";
import PropTypes from "prop-types";
const Food = ({ fav, image, size, rating }) => {
	console.log(size);
	const width = size[0] + "px";
	const height = size[1] + "px";
	return (
		<>
			<h1>I love {fav}</h1>
			<img src={image} alt="음식" width={width} height={height} />
			<h4>{rating}/5.0</h4>
		</>
	);
};
Food.propTypes = {
	fav: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	rating: PropTypes.number.isRequired
};

export default Food;
