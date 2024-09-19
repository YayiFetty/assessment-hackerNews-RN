import React from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = React.useState(false);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;