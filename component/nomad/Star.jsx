import React from "react";
import PropTypes from "prop-types";

const Star = ({ isHalf, isEmpty }) => {
	return (
		<>
			{isEmpty ? (
				<i className="far fa-star"></i>
			) : isHalf ? (
				<i className="fas fa-star-half-alt"></i>
			) : (
				<i className="fas fa-star"></i>
			)}
		</>
	);
};
Star.propTypes = {
	isHalf: PropTypes.bool.isRequired,
	isEmpty: PropTypes.bool.isRequired
};
export default Star;
