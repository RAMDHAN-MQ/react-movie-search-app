import { useState, useEffect } from "react";

const api = "http://www.omdbapi.com/?apikey=ce616f80&s=";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("");

  function fetchApi(url) {
    fetch(url)
      .then((respones) => respones.json())
      .then((data) => {
        if (data.Response !== "False") {
          setMovies(data.Search);
          setStatus("");
        } else {
          setMovies([]);
          setStatus(data.Error);
        }
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (!keyword) return;
    fetchApi(api + keyword);
  }, [keyword]);

  function handleKeyword(e) {
    e.preventDefault();

    setKeyword(e.target.elements.keyword.value);
  }

  return (
    <div className="container">
      <header>
        <h1>PILEM</h1>
        <div className="pencarian">
          <form onSubmit={handleKeyword}>
            <input type="text" name="keyword" placeholder="Masukkan judul..." />
            <button>Cari</button>
          </form>
        </div>
      </header>

      <div className="main">
        {status !== "" ? (
          <p className="error">{status}</p>
        ) : (
          <div className="list-card">
            {movies.map((e) => (
              <div className="card" key={e.imdbID}>
                <img src={e.Poster} alt={e.Title  }/>
                <div className="keterangan">
                  <p className="judul">{e.Title}</p>
                  <p className="tahun">Tahun: {e.Year}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
