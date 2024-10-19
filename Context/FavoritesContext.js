import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favoriteProperties, setFavoriteProperties] = useState([]);

    return (
        <FavoritesContext.Provider value={{ favoriteProperties, setFavoriteProperties }}>
            {children}
        </FavoritesContext.Provider>
    );
};
