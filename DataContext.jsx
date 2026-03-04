import React, { createContext, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("df:token") || null);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("df:user") || "null"));
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const authFetch = async (path, opts = {}) => {
    const headers = opts.headers || {};
    headers["Content-Type"] = "application/json";
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_URL}${path}`, { ...opts, headers });
    if (res.status === 401) {
      setToken(null);
      setUser(null);
      localStorage.removeItem("df:token");
      localStorage.removeItem("df:user");
      throw new Error("unauthorized");
    }
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  };

  useEffect(() => {
    const load = async () => {
      if (!token) {
        setPatients([]);
        setAppointments([]);
        return;
      }
      setLoading(true);
      try {
        const [p, a] = await Promise.all([
          authFetch("/api/patients"),
          authFetch("/api/appointments")
        ]);
        setPatients(p);
        setAppointments(a);
      } catch (err) {
        console.error("load error", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const register = async ({ name, email, password }) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw data;
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("df:token", data.token);
    localStorage.setItem("df:user", JSON.stringify(data.user));
    return data;
  };

  const login = async ({ email, password }) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw data;
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("df:token", data.token);
    localStorage.setItem("df:user", JSON.stringify(data.user));
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("df:token");
    localStorage.removeItem("df:user");
    setPatients([]);
    setAppointments([]);
  };

  const addPatient = async (payload) => {
    const p = await authFetch("/api/patients", { method: "POST", body: JSON.stringify(payload) });
    setPatients(prev => [p, ...prev]);
    return p;
  };
  const editPatient = async (id, changes) => {
    const p = await authFetch(`/api/patients/${id}`, { method: "PUT", body: JSON.stringify(changes) });
    setPatients(prev => prev.map(x => x.id === id ? p : x));
    return p;
  };
  const removePatient = async (id) => {
    await authFetch(`/api/patients/${id}`, { method: "DELETE" });
    setPatients(prev => prev.filter(x => x.id !== id));
    setAppointments(prev => prev.map(a => a.patient_id === id ? { ...a, patient_id: null, patient_name: null } : a));
  };

  const addAppointment = async (payload) => {
    const a = await authFetch("/api/appointments", { method: "POST", body: JSON.stringify(payload) });
    setAppointments(prev => [a, ...prev]);
    return a;
  };
  const editAppointment = async (id, changes) => {
    const a = await authFetch(`/api/appointments/${id}`, { method: "PUT", body: JSON.stringify(changes) });
    setAppointments(prev => prev.map(x => x.id === id ? a : x));
    return a;
  };
  const removeAppointment = async (id) => {
    await authFetch(`/api/appointments/${id}`, { method: "DELETE" });
    setAppointments(prev => prev.filter(x => x.id !== id));
  };

  const value = {
    user,
    token,
    loading,
    patients,
    appointments,
    register,
    login,
    logout,
    addPatient,
    editPatient,
    removePatient,
    addAppointment,
    editAppointment,
    removeAppointment
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error("useData must be used within DataProvider");
    return ctx;
};
