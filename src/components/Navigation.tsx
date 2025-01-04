import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Newspaper } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="flex items-center gap-4 mb-8">
      <Link to="/">
        <Button
          variant={location.pathname === "/" ? "default" : "ghost"}
          className="gap-2"
        >
          <Newspaper className="h-4 w-4" />
          Hacker News
        </Button>
      </Link>
      <Link to="/latest-news">
        <Button
          variant={location.pathname === "/latest-news" ? "default" : "ghost"}
          className="gap-2"
        >
          <Newspaper className="h-4 w-4" />
          Latest News
        </Button>
      </Link>
    </nav>
  );
};