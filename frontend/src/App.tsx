import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

const SignIn = lazy(() => import("./pages/SignIn"));
const Signup = lazy(() => import("./pages/Signup"));
const Notfound = lazy(() => import("./pages/Notfound"));
const Hero = lazy(() => import("./pages/Hero"));
const Movies = lazy(() => import("./pages/Movies"));

function App() {

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/movies" element={
            <ProtectedRoute>
              <Movies/>
            </ProtectedRoute>
          } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Hero />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;