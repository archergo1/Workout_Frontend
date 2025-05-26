import { Link } from "react-router-dom";
// import { useLogout } from "../hooks/useLogout";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useAuthStore } from "../store/useAuthStore";

function Navbar() {
  // const { logout } = useLogout();
  // const { user } = useAuthContext();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleClick = () => {
    logout();
  };
  console.log("user", user);
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>Hello {user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
