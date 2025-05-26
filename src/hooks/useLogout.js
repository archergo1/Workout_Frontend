import { useAuthContext } from "./useAuthContext";
import { useWorkoutStore } from "../store/useWorkoutStore";

export function useLogout() {
  const { dispatch } = useAuthContext();
  const setWorkouts = useWorkoutStore((state) => state.setWorkouts);

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    // workoutDispatch({ type: "SET_WORKOUTS", payload: null });
    setWorkouts(null);
  };

  return { logout };
}

// Log out by doing 2 things
// 1. change the global state
// 2. delete the token in the local storage
