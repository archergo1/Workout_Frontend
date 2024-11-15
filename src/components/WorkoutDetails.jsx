import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { API_URL } from "../context/WorkoutContext";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const handleClick = async () => {
    const response = await fetch(
      // 最後面記得要加斜線啊啊啊啊/
      API_URL + workout._id,
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
        {`  ${workout.load}`}
      </p>
      <p>
        <strong>Reps:</strong>
        {`  ${workout.reps}`}
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
