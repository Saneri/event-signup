import {
  CognitoUserAttribute,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentSession, getCurrentUser } from "../auth/auth";

type UserContextType = {
  user: CognitoUserAttribute[] | null;
  session: CognitoUserSession | null;
  fetchUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CognitoUserAttribute[] | null>(null);
  const [session, setSession] = useState<CognitoUserSession | null>(null);

  const fetchUser = async (): Promise<void> => {
    const userFromLocalStorage = await getCurrentUser();
    setUser(userFromLocalStorage ?? null);
    const session = await getCurrentSession();
    setSession(session);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, session, fetchUser }}>
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
