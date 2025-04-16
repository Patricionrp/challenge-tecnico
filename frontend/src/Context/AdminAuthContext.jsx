import { createContext, useEffect, useState } from "react";

export const AdminAuthContext = createContext();

export default function AdminAuthProvider({ children }) {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('token'));
  const [adminUser, setAdminUser] = useState(null);

  async function fetchAdminUser() {
    const res = await fetch('/api/admin/user', {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    const data = await res.json();
    setAdminUser(data);
  }

  useEffect(() => {
    if (adminToken) {
      fetchAdminUser();
    }
  }, [adminToken]);

  return (
    <AdminAuthContext.Provider value={{ adminToken, setAdminToken, adminUser }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
