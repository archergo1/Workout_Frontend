import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { WorkoutsContextProvider } from "./context/WorkoutContext";
// import { AuthContextProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(<App />);
