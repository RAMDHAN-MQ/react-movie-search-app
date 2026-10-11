import Button from "./Button";

export default function Header({ onHandleKeyword }) {
  return (
    <header>
      <h1>PILEM</h1>
      <div className="pencarian">
        <form onSubmit={onHandleKeyword}>
          <input type="text" name="keyword" placeholder="Masukkan judul..." />
          <Button text={"Cari"} />
        </form>
      </div>
    </header>
  );
}
