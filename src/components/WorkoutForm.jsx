import { useState } from "react";
import { API_URL } from "../context/WorkoutContext";
import { useWorkoutStore } from "../store/useWorkoutStore";
import { useAuthStore } from "../store/useAuthStore";

function WorkoutForm() {
  const createWorkout = useWorkoutStore((state) => state.createWorkout);
  const user = useAuthStore((state) => state.user);

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, load, reps };
    const response = await fetch(`${API_URL}/workouts/`, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      // update fail
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    } else {
      // successful update
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      createWorkout(json);
      console.log("new workout added", json);
    }
  };

  return (
    <form action="" className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label htmlFor="">Excersize Title</label>
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label htmlFor="">Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => {
          setLoad(e.target.value);
        }}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => {
          setReps(e.target.value);
        }}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
