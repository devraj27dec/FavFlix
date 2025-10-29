import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="flex items-center mb-4">
        <Film className="w-19 h-10 text-primary" />
          <h1 className="text-3xl font-bold">FavFlix</h1>
        </div>
      <h1 className="text-4xl font-bold text-gray-300 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-500 mb-6 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
