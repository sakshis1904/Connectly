import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import "./styles/main.css";

function App() {
  return (
    <Router>
      <div className="app">
        <SignedIn>
          <Routes>
            <Route path="/" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          </Routes>
        </SignedIn>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </div>
    </Router>
  );
}

export default App;
