import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import http from "../services/http.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    // Regular user authentication
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    if (t && u) {
      setToken(t);
      try {
        setUser(JSON.parse(u));
      } catch {}
    }

    // Admin user authentication
    const adminT = localStorage.getItem("adminToken");
    const adminU = localStorage.getItem("adminUser");
    if (adminT && adminU) {
      setAdminToken(adminT);
      try {
        setAdminUser(JSON.parse(adminU));
      } catch {}
    }
  }, []);

  const login = (userObj, jwt) => {
    setUser(userObj);
    setToken(jwt);
    localStorage.setItem("user", JSON.stringify(userObj));
    localStorage.setItem("token", jwt);
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await http.post("/api/auth/admin/login", {
        email,
        password,
      });

      const { user: adminUserData, token: adminJwt } = response.data;
      setAdminUser(adminUserData);
      setAdminToken(adminJwt);
      localStorage.setItem("adminUser", JSON.stringify(adminUserData));
      localStorage.setItem("adminToken", adminJwt);

      return { user: adminUserData, token: adminJwt };
    } catch (error) {
      console.error("Admin login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const adminLogout = () => {
    setAdminUser(null);
    setAdminToken(null);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
  };

  const logoutAll = () => {
    logout();
    adminLogout();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      adminUser,
      adminToken,
      login,
      adminLogin,
      logout,
      adminLogout,
      logoutAll,
      isAdmin: !!adminUser,
    }),
    [user, token, adminUser, adminToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
