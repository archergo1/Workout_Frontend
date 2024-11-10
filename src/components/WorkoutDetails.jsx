import { useWorkoutsContext } from "../hooks/useWorkoutContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const handleClick = async () => {
    const response = await fetch(
      // 最後面記得要加斜線啊啊啊啊/
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load:(kg):</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps:</strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
}

export default WorkoutDetails;
