"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import * as actions from "@/actions";
import { toast } from "react-toastify";

interface StateContextProps {
  authToken: string;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  authUserId: number | null;
  authEmail: string;
  authName: string;
  handleLogOut: () => void;
}

const StateContext = createContext<StateContextProps | any>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string>("");
  const [authUserId, setAuthUserId] = useState<number | null>(null);
  const [authEmail, setAuthEmail] = useState<string>("");
  const [authName, setAuthName] = useState<string>("");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setAuthToken("");
    setAuthUserId(null);
    setAuthEmail("");
    setAuthName("");
    actions.goToLoginPage();
  };

  const Tsuccess = (msg: string) => {
    toast.success(`${msg}`);
  };
  const Terror = (msg: string) => {
    toast.error(`${msg}`);
  };

  const fetchUserData = useCallback(async () => {
    try {
      const data = await actions.fetchUser(authToken);
      setAuthEmail(data.email);
      setAuthName(data.name);
      setAuthUserId(data.id);
    } catch (error) {
      handleLogOut();
    }
  }, [authToken]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      fetchUserData();
    }
  }, [authToken, fetchUserData]);

  return (
    <StateContext.Provider
      value={{
        authToken,
        setAuthToken,
        authUserId,
        authEmail,
        authName,
        handleLogOut,
        Terror,
        Tsuccess,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
