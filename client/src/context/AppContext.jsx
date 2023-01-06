import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = sessionStorage.getItem('user');
  const [currentPets, setCurrentPets] = useState(null);

  useEffect(() => {
    if (user && !currentUser) {
      axios
        .get('/user/me', { withCredentials: true })
        .then((res) => {
          setCurrentUser(res.data);
          setCurrentPets(res.data.ownedPets);
        })
        .catch((error) => console.log(error));
    }
  }, [currentUser, user, currentPets, setCurrentUser, setLoading]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        user,
        loading,
        setLoading,
        currentPets,
        setCurrentPets
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
