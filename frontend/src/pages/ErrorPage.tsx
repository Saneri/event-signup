import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
