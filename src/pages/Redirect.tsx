// src/pages/RedirectPage.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUrlByKey } from '../api/api'; // Asegúrate de tener esta función para obtener la URL original

const RedirectPage: React.FC = () => {
    const { url_key } = useParams<{ url_key: string }>();
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    useEffect(() => {
        const getUrl = async () => {
            // Verificar si url_key está definido
            if (!url_key) {
                console.error("URL Key no está definido");
                navigate('/'); // Redirigir a la página principal o mostrar un mensaje
                return; // Salir de la función
            }

            try {
                const response = await fetchUrlByKey(url_key); // Llama a la API para obtener la URL original
                const originalUrl = response.data.url;

                // Espera 3 segundos antes de redirigir
                setTimeout(() => {
                    window.location.href = originalUrl; // Redirige a la URL original
                }, 3000);
            } catch (error) {
                console.error("Error al obtener la URL:", error);
                navigate('/'); // Redirigir a la página principal en caso de error
            }
        };

        getUrl();
    }, [url_key, navigate]); // Añadir navigate a las dependencias

    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">wait a moment...</h1>
        </div>
    );
};

export default RedirectPage;
