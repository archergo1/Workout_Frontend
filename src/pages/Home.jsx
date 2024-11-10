import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { API_URL } from "../context/WorkoutContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(API_URL);
      console.log(response);
      const json = await response.json();

      console.log("json", json);
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
      // debugger;
      // console.log("workouts", workouts);
    };

    fetchWorkouts();
  }, [dispatch]);

  useEffect(() => {
    console.log("workouts updated:", workouts);
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
