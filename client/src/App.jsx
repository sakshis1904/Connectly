import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Navbar from "./components/Common/Navbar";
import "./styles/main.css";

function App() {
  return (
    <Router>
      <div className="app">
        <SignedIn>
          <div className="app-container">
            <Navbar />
            <Routes>
              <Route path="/" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            </Routes>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="signin-container">
            <SignIn />
          </div>
        </SignedOut>
      </div>
    </Router>
  );
}

export default App;
