// import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useWorkoutStore } from "../store/useWorkoutStore";
// import { useAuthContext } from "../hooks/useAuthContext";
import { useAuthStore } from "../store/useAuthStore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { API_URL } from "../context/WorkoutContext";

function WorkoutDetails({ workout }) {
  // const { dispatch } = useWorkoutsContext();
  // const deleteWorkout = useWorkoutStore((state) => {
  //   state.deleteWorkout;
  // });

  const deleteWorkout = useWorkoutStore((state) => state.deleteWorkout);

  console.log("deleteWorkout function:", deleteWorkout);

  // const { user } = useAuthContext();
  const user = useAuthStore((state) => state.user);

  console.log("detail user", user);

  const handleClick = async () => {
    console.log("user token:", user.token);
    if (!user) {
      console.log("No user found");
      return;
    }
    // const response = await fetch(API_URL + "workouts/" + workout._id, {
    //   method: "DELETE",
    //   headers: { Authorization: `Bearer ${user.token}` },
    // });
    // const json = await response.json();
    // console.log(json);
    // if (response.ok) {
    //   // dispatch({ type: "DELETE_WORKOUT", payload: json });
    //   deleteWorkout(json._id);
    // }

    try {
      // 修正 2: 加入錯誤處理和正確的 API 路徑
      const response = await fetch(`${API_URL}workouts/${workout._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Delete response:", json);

      deleteWorkout(workout._id);
    } catch (error) {
      console.error("Failed to delete workout:", error);
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
