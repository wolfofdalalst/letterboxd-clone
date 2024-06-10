// eslint-disable-next-line react/prop-types
function MovieCard({ name, rating, summary }) {
    return (
        <div className="movie-card">
            <h1>{name}</h1>
            <p>{rating}</p>
            <p>{summary}</p>
        </div>
    ); 
}

export default MovieCard;