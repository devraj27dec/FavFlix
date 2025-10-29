import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Film } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const {session , logout} = useAuth()
  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Film className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">FavFlix</h1>
        </div>
        <div className="flex gap-3">
          {!session ? (
            <Button onClick={() => logout()}>
              Logout
            </Button>
          ): (
            <>
              <Button variant="ghost" asChild>
                <Link to="/signin">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}