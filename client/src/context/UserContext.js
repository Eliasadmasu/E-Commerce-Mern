// authContext.js
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import generateNewAccessToken from "../config/generateRefreshToken";
import axios from "axios";
import API_URL from "../config/config";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    return Cookies.get("accessToken") || null;
  });
  const [refreshToken, setRefreshToken] = useState(() => {
    return Cookies.get("refreshToken") || null;
  });
  const [role, setRole] = useState(() => {
    return Cookies.get("role") || "";
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const fetchCartItemCount = async () => {
    try {
      await generateNewAccessToken();

      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("accessToken missing");
        return;
      }

      const res = await axios.get(`${API_URL}/cart/count`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCartItemCount(res.data.cartItemCount);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartItemCount();
  }, []);
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
        searchError,
        setSearchError,
        loading,
        setLoading,
        searchQuery,
        handleSearch,
        searchTerm,
        setSearchTerm,
        fetchCartItemCount,
        cartItemCount,
        setCartItemCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
