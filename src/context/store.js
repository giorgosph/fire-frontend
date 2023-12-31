import { createContext, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: (token) => {},
});

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(false); 
  
  const decodeToken = (token) => {
    try {
      const { auth } = jwtDecode(token.split(" ")[1]);
      console.log("TOKEN:\n" + token + "\nAuth:\n" + auth);
      return { auth };
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  function authenticate(token) {
    const { auth } = decodeToken(token);

    if(auth) setToken(token);
    else console.error("Something went wrong.\nKindly contact your administrator!");

    console.log("TOKEN has been set");
  }

  function logout() {
    setToken(false);
  }

  const value = useMemo(() => {
    return {
      token,
      isAuthenticated: !!token,
      authenticate,
      logout,
    };
  }, [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;