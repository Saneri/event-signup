import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";

export function useAuthRedirect() {
  const { session, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate("/login");
    }
  }, [session, loading, navigate]);
}
