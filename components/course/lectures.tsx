"use client";
import { useCoursesStore } from "./../course/services/zustand";
import { useState, useEffect } from "react";

export default function Lectures({ lectures }) {
  const courses = useCoursesStore((state: any) => {
    return state.courses;
  });

  const store: any = useCoursesStore.getState();

  useEffect(() => {
    store.clearCourses();
  }, []);

  const newCourses = courses.flat().map((c: any) => {
    const meta = lectures.find((m: any) => String(m.id) === String(c.courseId));

    return {
      id: meta.id,
      price: c.price,
      type: meta.type,
      title: meta.title,
      coverImage: meta.coverImage,
    };
  });

  let totalSpent = newCourses.reduce((acc, c) => {
    return acc + Number(c.price);
  }, 0);

  totalSpent = (totalSpent / 1e18).toFixed(3);

  return (
    <ul className="full-w divide-y divide-default">
      {newCourses.length === 0 && (
        <p className="text-body text-sm py-4 text-center">No courses found.</p>
      )}
      {newCourses.length != 0 && (
        <p className="text-body text-sm py-4 text-center">
          Courses purchased: {newCourses.length}, total user spend: {totalSpent}{" "}
          ETH
        </p>
      )}
      {newCourses.map((c) => (
        <li className="pb-3 sm:pb-4" key={c}>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="shrink-0">
              <img
                className="rounded-t-base w-12 h-12 object-cover"
                src={c.coverImage}
                alt={c.type}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-body truncate">{c.type}</p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-heading">
              {(Number(c.price) / 1e18).toFixed(3)} ETH
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
