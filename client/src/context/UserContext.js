// authContext.js
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => {
    return Cookies.get("accessToken") || null;
  });
  const [refreshToken, setRefreshToken] = useState(() => {
    return Cookies.get("refreshToken") || null;
  });
  const [role, setRole] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        isSignUp,
        setIsSignUp,
        role,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
