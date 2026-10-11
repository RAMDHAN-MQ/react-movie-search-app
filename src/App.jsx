import { useState } from "react";

const api = "http://www.omdbapi.com/?apikey=ce616f80&";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isDetailLoading, setDetailLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const [detail, setDetail] = useState({});

  function fetchApi(url) {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
          setStatus("");
        } else {
          setMovies([]);
          setStatus(data.Error);
        }
      })
      .catch((error) => {
        console.log(error);
        setMovies([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function fetchApiDetail(url) {
    setDetailLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDetail(data);
      })
      .catch((error) => {
        console.log(error);
        setDetail({});
      })
      .finally(() => {
        setDetailLoading(false);
      });
  }

  function handleKeyword(e) {
    e.preventDefault();

    const keyword = e.target.elements.keyword.value;
    fetchApi(`${api}s=${keyword}`);
  }

  function handleOpenModal(id) {
    setModal(true);
    fetchApiDetail(`${api}i=${id}`);
  }

  function handleCloseModal(event) {
    if (event.target.className === "modal buka") {
      setModal(false);
      setDetail({});
    }
  }

  return (
    <div className="container" onClick={handleCloseModal}>
      <Header onHandleKeyword={handleKeyword} />
      <Main
        isLoading={isLoading}
        movies={movies}
        onOpenModal={handleOpenModal}
        status={status}
      />
      <Modal isModal={isModal} detail={detail} loading={isDetailLoading} />
    </div>
  );
}

function Header({ onHandleKeyword }) {
  return (
    <header>
      <h1>PILEM</h1>
      <div className="pencarian">
        <form onSubmit={onHandleKeyword}>
          <input type="text" name="keyword" placeholder="Masukkan judul..." />
          <button>Cari</button>
        </form>
      </div>
    </header>
  );
}

function Main({ isLoading, movies, onOpenModal, status }) {
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

function Modal({ isModal, detail, loading }) {
  return (
    <div className={`modal ${isModal ? "buka" : ""}`}>
      {loading ? (
        <div className="modal-content">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="modal-content">
          <img src={detail.Poster} alt="judul" />
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
