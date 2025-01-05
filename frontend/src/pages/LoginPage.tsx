import { Link } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
import { useUser } from "../providers/UserProvider";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const { user } = useUser();

  if (user) {
    const email = user.email;
    return (
      <div className="flex flex-col items-center gap-4">
        <div>You are logged in as {email}</div>
        <Link to={"/"}>
          <Button>Back to front page</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
