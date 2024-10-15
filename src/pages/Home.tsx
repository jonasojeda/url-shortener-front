import React, { useState } from "react";
import { createUrl } from "../api/api";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [inputUrl, setInputUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Inicializar el hook de navegación

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await createUrl(inputUrl);

      // Redirigir a la página de lista de URLs después de la creación exitosa
      navigate("/urls");
    } catch (err) {
      setError("Error shortening URL. Invalid format.");
    }
  };

  return (
    <div className="my-4">
      <h1 className="text-3xl font-bold">Create new URL</h1>
      <form onSubmit={handleSubmit} className="flex mt-4">
        <div className="flex flex-col w-screen space-y-4">
          <label className="font-extrabold" htmlFor="url">
            Original URL
          </label>
          <input
            type="text"
            value={inputUrl}
            name="url"
            onChange={(e) => setInputUrl(e.target.value)}
            className="border border-black p-2 flex-grow rounded-lg text-black font-bold"
            placeholder="..."
            required
          />
          <button
            type="submit"
            className="font-extrabold border border-black rounded-lg bg-white text-black p-2 w-[200px] ml-auto "
          >
            CREATE
          </button>
        </div>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Home;
