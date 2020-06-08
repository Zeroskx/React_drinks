import React, {createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });

    // Tercer State

    const [consultar,guardarConsultar] = useState(false);

    // Destructuring a lo recibido de la busqueda

    const {nombre,categoria} = busqueda;

    useEffect(() => {

        if (consultar) {
            // Consultar a la API
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`
                const resultado = await axios.get(url);
                guardarRecetas(resultado.data.drinks);
            }
            obtenerRecetas();
        }
    },[busqueda, nombre, categoria, consultar])

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}

export default RecetasProvider;