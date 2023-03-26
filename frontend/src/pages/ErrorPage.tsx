import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const NoPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h1>404 - Page not found</h1>
      <Link to={"/"}>
        <Button>Back to front page</Button>
      </Link>
    </div>
  );
};

export default NoPage;
