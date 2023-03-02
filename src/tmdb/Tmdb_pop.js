import { Link, NavLink } from "react-router-dom";

const MoviePop = (props) => {
  const { movie } = props;
  return (
    <div className="Tmdb_pop_movieTile_section">
      <div className="Tmdb_pop_movie_tile">
        {/* <div className="movie_poster">
            {movie.poster_path === null || movie.poster_path === undefined ? (
              <img src="/images/none_img.jpg" width="200" />
            ) : (
              <img
                src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
                width="300"
              />
            )}
          </div> */}
        <NavLink to={`/detail/${movie.id}`} style={{ textDecoration: "none" }}>
          <div className="Tmdb_pop_movie_title">{movie.title}</div>
        </NavLink>
      </div>
    </div>
  );
};

export default MoviePop;
