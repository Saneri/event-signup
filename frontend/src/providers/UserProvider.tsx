import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  fetchAuthSession,
  AuthSession,
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from "aws-amplify/auth";

type UserContextType = {
  user: FetchUserAttributesOutput | null;
  session: AuthSession | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FetchUserAttributesOutput | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async (): Promise<void> => {
    setLoading(true);
    const session = await fetchAuthSession();
    setSession(session);
    if (session.userSub) {
      const userFromLocalStorage = await fetchUserAttributes();
      setUser(userFromLocalStorage);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, session, loading, fetchUser }}>
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
