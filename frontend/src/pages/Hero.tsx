import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


export default function Hero() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header/>
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              Your Personal
              <span className="text-primary"> Movie & TV </span>
              Collection
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover, track, and organize your favorite movies and TV shows all in one place.
              Never forget what to watch next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link to="/signup">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}