import { createContext, useReducer } from "react";
import { workoutsReducer } from "./WorkoutsReducer";

export const WorkoutsContext = createContext();
export const API_URL = "https://workout-backend-2hqj.onrender.com/api/";
// export const API_URL = "https://localhost:5173/api/";

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    // remember to use spread operator for state
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
