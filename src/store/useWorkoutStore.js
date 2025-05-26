import { create } from "zustand";

export const useWorkoutStore = create((set) => ({
  workouts: null,
  setWorkouts: (workouts) => set({ workouts }),
  createWorkout: (workout) =>
    set((state) => ({
      workouts: [workout, ...(state.workouts || [])],
    })),
  deleteWorkout: (id) =>
    set((state) => ({
      workouts: (state.workouts || []).filter((workout) => workout._id !== id),
    })),
}));
