export default function Main({ isLoading, movies, onOpenModal, status }) {
  return (
    <div className="main">
      {isLoading ? (
        <p>Loading...</p>
      ) : status !== "" ? (
        <p>{status}</p>
      ) : (
        <div className="list-card">
          {movies.map((e) => (
            <div
              className="card"
              key={e.imdbID}
              onClick={() => onOpenModal(e.imdbID)}
            >
              <img src={e.Poster} alt={e.Title} />
              <div className="keterangan">
                <p className="judul">{e.Title}</p>
                <p className="tahun">Tahun: {e.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
