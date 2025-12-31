import { SignOutButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Connectly</h1>
        <SignOutButton>
          <button className="logout-btn">Logout</button>
        </SignOutButton>
      </div>
    </nav>
  );
};

export default Navbar;