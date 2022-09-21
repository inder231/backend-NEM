import React from "react";
import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
export const Appcontext = createContext();

export const AppcontextProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("user_auth_token"));
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const [login, setLogin] = useState("");
  const [signup, setSignup] = useState("");

  const signupUser = (user) => {
    setLoading(true);
    axios
      .post("http://localhost:8000/user/signup", user)
      .then((res) => {
        setSignup(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setSignup(err.response.data);
        setLoading(false);
        setError(true);
      });
  };
  const loginUser = (user) => {
    setLoading(true);
    axios
      .post("http://localhost:8000/user/login", user)
      .then((res) => {
        setLogin(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLogin(err.response.data);
        setLoading(false);
        setError(true);
      });
  };
  const getNotes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/notes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(res.data.notes);
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  };
  const createNote = async (payload) => {
    try {
      return await axios.post("http://localhost:8000/notes/create", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      return err;
    }
  };
  const updateNote = async (payload, id) => {
    try {
      return await axios.patch(
        `http://localhost:8000/notes/edit/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      return err;
    }
  };
  const deleteNote = async (noteId) => {
    try {
      return await axios.delete(
        `http://localhost:8000/notes/delete/${noteId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      return err;
    }
  };
  const value = {
    signupUser,
    loginUser,
    loading,
    error,
    error,
    login,
    signup,
    setSignup,
    setLogin,
    getNotes,
    createNote,
    deleteNote,
    updateNote,
    notes,
  };
  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};
