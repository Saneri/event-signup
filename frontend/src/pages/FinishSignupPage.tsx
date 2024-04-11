import { Link, useLocation } from "react-router-dom";
import FinishSignupForm from "../components/login/FinishSignupForm";
import Button from "../components/common/Button";

const FinishSignupPage = () => {
  const location = useLocation();
  const username = location.state?.username;

  if (!username) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div>No registration processes ongoing</div>
        <Link to={"/"}>
          <Button>Back to front page</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <div>It seems that it's your first time logging in. </div>
        <div>Welcome, {username}!</div>
      </div>
      <FinishSignupForm />
    </div>
  );
};

export default FinishSignupPage;
