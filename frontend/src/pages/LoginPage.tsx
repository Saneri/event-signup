import { Link } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
import { useUser } from "../providers/UserProvider";
import Button from "../components/common/Button";

const LoginPage = () => {
  const { user } = useUser();

  if (user) {
    const email = user
      ?.find((attribute) => attribute.getName() === "email")
      ?.getValue();
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
