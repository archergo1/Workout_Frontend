import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { useAuthStore } from "../store/useAuthStore";

import { API_URL } from "../context/WorkoutContext";

const Home = () => {
  const workouts = useWorkoutStore((state) => state.workouts);
  const setWorkouts = useWorkoutStore((state) => state.setWorkouts);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${API_URL}/workouts/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setWorkouts(json);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
        // 可以設置錯誤狀態或顯示錯誤訊息給用戶
      }
    };

    if (user?.token) {
      fetchWorkouts();
    }
  }, [user?.token, setWorkouts]);

  useEffect(() => {
    console.log("Workouts updated in Home:", workouts);
  }, [workouts]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
