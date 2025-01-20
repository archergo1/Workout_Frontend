import { useAuthContext } from "./useAuthContext";

export function useLogout() {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
}

// Log out by doing 2 things
// 1. change the global state
// 2. delete the token in the local storage
