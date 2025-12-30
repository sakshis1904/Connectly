import { useAuth } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return <div>Please sign in</div>;
  }

  return children;
};

export default ProtectedRoute;