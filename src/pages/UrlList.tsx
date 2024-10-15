import React, { useEffect, useState } from "react";
import { fetchUrls, deleteUrl } from "../api/api"; // Agregar la función deleteUrl que hará la solicitud de DELETE

const UrlList: React.FC = () => {
  const [urls, setUrls] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUrls = async () => {
      try {
        const response = await fetchUrls();
        setUrls(response.data); // Acceder correctamente a la propiedad 'data'
      } catch (err) {
        setError("Error loading URLs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getUrls();
  }, []);

  // Función para eliminar una URL
  const handleDelete = async (id: number) => {
    try {
      await deleteUrl(id); // Llamar a la API para eliminar la URL
      setUrls(urls.filter((url) => url.id !== id)); // Filtrar la URL eliminada de la lista
    } catch (err) {
      setError("Error deleting the URL.");
    }
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Shortened URLs:</h2>
        <button
          onClick={() => (window.location.href = `/`)} // Abrir en la misma ventana
          className="border-black border-2 bg-white text-black text-3xl font-bold px-3 py-2 mb-4 text-center inline-block rounded-lg"
        >
          +
        </button>
      </div>

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <table className="min-w-full bg-white ">
          <thead>
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Code</th>
              <th className="py-2 px-4 ">Original URL</th>
              <th className="py-2 px-4 ">Actions</th>{" "}
              {/* Nueva columna Actions */}
            </tr>
          </thead>
          <tbody className="font-bold text-black">
            {urls.map((url) => (
              <tr
                key={url.id}
                className="border-2 border-black rounded-lg mb-4 "
              >
                <td className="py-2 px-4 border-l border-b border-t">
                  {url.id}
                </td>
                <td className="py-2 px-4 border-b border-t">
                  <a
                    href={url.shortUrl}
                    rel="noopener noreferrer"
                  >
                    {url.url_key}
                  </a>
                </td>
                <td className="py-2 px-4 border-b border-t">
                  <span className="text-gray-600">{url.url}</span>
                </td>
                <td className="py-2 px-4 border-b border-t border-r">
                  {/* Botón Redirect que abre una nueva pestaña con la URL intermedia */}
                  <button
                    onClick={() => window.open(`/${url.url_key}`, "_blank")} // Cambiar a '/{url_key}'
                    className="border border-2 border-black p-2 rounded mr-[5px]"
                    title = "Redirect"
                  >
                    <img
                      src="/icons/redirect.png" // Ruta a tu imagen
                      alt="Delete" // Texto alternativo
                      className="w-4 h-4" // Ajusta el tamaño de la imagen
                    />
                  </button>

                  {/* Botón Delete */}
                  <button
                    onClick={() => handleDelete(url.id)} // Llamar a handleDelete al hacer clic
                    className="border border-2 border-black p-2 rounded" // Agrega un poco de padding y bordes redondeados
                    title="Delete"
                  >
                    <img
                      src="/icons/trash.png" // Ruta a tu imagen
                      alt="Delete" // Texto alternativo
                      className="w-4 h-4" // Ajusta el tamaño de la imagen
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default UrlList;
