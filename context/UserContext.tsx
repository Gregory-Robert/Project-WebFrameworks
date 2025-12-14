import { createContext, ReactNode, useState, useEffect } from "react";
import { getName, setName, clearStorage } from "@/storage/asyncStorage";

interface UserContextType {
  username: string;
  setUsername: (name: string) => void;
  resetUsername: () => void;
}

export const UserContext = createContext<UserContextType>({
  username: "",
  setUsername: () => {},
  resetUsername: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, _setUsername] = useState("");

  useEffect(() => {
    (async () => {
      const stored = await getName<string>("name");
      if (stored) _setUsername(stored);
    })();
  }, []);

  const setUsername = (name: string) => {
    _setUsername(name);
    setName("name", name);
  };

  const resetUsername = () => {
    _setUsername("");
    clearStorage();
  };

  return (
    <UserContext.Provider value={{ username, setUsername, resetUsername }}>
      {children}
    </UserContext.Provider>
  );
};
