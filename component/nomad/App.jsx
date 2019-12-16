import React, { useEffect, useState, useRef } from "react";
import "babel-polyfill";
import Movie from "./Movie.jsx";
import "./App.css";

const axios = require("axios");
function log(value) {
	console.log(value);
	return value;
}

const App = () => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getMovies = async () => {
		log("getMovie");
		const {
			data: {
				data: { movies }
			}
		} = await axios.get(
			"https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
		);
		setMovies(log(movies));
		setIsLoading(false);
		return 0;
	};

	useEffect(() => {
		/* did mount */
		getMovies();
		return () => {};
	}, []);

	return (
		<>
			<section className="container">
				{isLoading ? (
					<div className="loader">
						<span className="loader_text">Loading...</span>
					</div>
				) : (
					<div className="movies">
						{movies.map(v => {
							return (
								<Movie
									key={v.id}
									id={v.id}
									year={v.year}
									title={v.title}
									summary={v.summary}
									poster={v.medium_cover_image}
								/>
							);
						})}
					</div>
				)}
			</section>
		</>
	);
};

export default App;
