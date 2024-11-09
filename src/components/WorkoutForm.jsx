import { useState } from "react";
function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
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
