import { useState } from "react";
import { api } from "./api";
import Header from "./components/Header";
import Main from "./components/Main";
import Modal from "./components/Modal";
import Page from "./components/Page";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isDetailLoading, setDetailLoading] = useState(false);
  const [isModal, setModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  function fetchApi(url) {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
          setStatus("");
          setTotalPage(Math.ceil(Number(data.totalResults / 10)));
        } else {
          setMovies([]);
          setStatus(data.Error);
        }
      })
      .catch((error) => {
        setMovies([]);
        setStatus("Terjadi Kesalahan", error);
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
        if (data.Response === "True") {
          setDetail(data);
          setStatus("");
        } else {
          setDetail({});
          setStatus(data.Error);
        }
      })
      .catch((error) => {
        setDetail({});
        setStatus("Terjadi Kesalahan", error);
      })
      .finally(() => {
        setDetailLoading(false);
      });
  }

  function handleKeyword(e) {
    e.preventDefault();

    const value = e.target.elements.keyword.value;
    if (value === "") return;

    setKeyword(value);
    setPage(1);

    fetchApi(`${api}s=${value}&page=1`);
  }

  function handleOpenModal(id) {
    setModal(true);
    fetchApiDetail(`${api}i=${id}`);
  }

  function handleCloseModal(event) {
    if (event.target.classList.contains("modal")) {
      setModal(false);
      setDetail({});
    }
  }

  function handlePage(ket) {
    if (ket === "next") {
      const pageSekarang = page + 1;
      fetchApi(`${api}s=${keyword}&page=${pageSekarang}`);
      setPage(pageSekarang);
    } else {
      const pageSekarang = page - 1;
      fetchApi(`${api}s=${keyword}&page=${pageSekarang}`);
      setPage(pageSekarang);
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
      <Page
        onPage={handlePage}
        totalPage={totalPage}
        movies={movies}
        page={page}
      />
    </div>
  );
}
