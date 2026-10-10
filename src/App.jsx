import { useState, useEffect } from "react";

const api = "http://www.omdbapi.com/?apikey=ce616f80&type=movie";

export default function App() {
  const [data, setData] = useState("");

    useEffect(() => {
      fetch(api)
        .then((respones) => respones.json())
        .then((data) => console.log(data));
    }, [data]);

  return (
    <div className="container">
      <header>
        <h1 className="text-red-500 text-4xl">NETBLIX</h1>
      </header>
    </div>
  );
}
