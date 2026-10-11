import Button from "./Button";

export default function Page({ onPage, totalPage, movies, page }) {
  return (
    <div className={`control ${movies.length === 0 ? "kosong" : ""}`}>
      <div className="page-control">
        <Button
          text={"Sebelumnya"}
          onClick={() => onPage("prev")}
          disabled={page === 1}
        />
        <p className="active">{page}</p>
        <p>/ {totalPage}</p>
        <Button
          text={"Selanjutnya"}
          onClick={() => onPage("next")}
          disabled={page === totalPage}
        />
      </div>
    </div>
  );
}
