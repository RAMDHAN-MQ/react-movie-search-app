export default function Modal({ isModal, detail, loading }) {
  return (
    <div className={`modal ${isModal ? "buka" : ""}`}>
      {loading ? (
        <div className="modal-content">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="modal-content">
          <img src={detail.Poster} alt={detail.Title} />
          <div className="modal-info">
            <ul>
              <li>Judul: {detail.Title}</li>
              <li>Runtime: {detail.Runtime}</li>
              <li>Tahun: {detail.Year}</li>
              <li>Director: {detail.Director}</li>
              <li>Rating: {detail.imdbRating} &#9733;</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
