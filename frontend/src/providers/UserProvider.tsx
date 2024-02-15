import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "../auth/auth";

type UserContextType = {
  user: CognitoUserAttribute[] | null;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CognitoUserAttribute[] | null>(null);

  const fetchUser = async () => {
    const userFromLocalStorage = await getCurrentUser();
    setUser(userFromLocalStorage ?? null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
