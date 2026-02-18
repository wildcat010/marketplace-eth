import { create } from "zustand";

export const useCoursesStore = create((set) => ({
  courses: [],

  addCourses: (course) =>
    set((state) => ({
      courses: [...state.courses, course],
    })),

  clearCourses: () =>
    set(() => ({
      courses: [],
    })),
}));
