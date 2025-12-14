import { createContext, ReactNode, useState, useEffect } from "react";
import { getName, setName, clearStorage } from "@/storage/asyncStorage";

interface UserContextType {
  username: string;
  changeUsername: (name: string) => void;
  resetUsername: () => void;
}

export const UserContext = createContext<UserContextType>({
  username: "",
  changeUsername: () => {},
  resetUsername: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async () => {
      const stored = await getName<string>("name");
      if (stored) setUsername(stored);
    })();
  }, []);

  const changeUsername = (name: string) => {
    setUsername(name);
    setName("name", name);
  };

  const resetUsername = () => {
    setUsername("");
    clearStorage();
  };

  return (
    <UserContext.Provider value={{ username, changeUsername, resetUsername }}>
      {children}
    </UserContext.Provider>
  );
};
