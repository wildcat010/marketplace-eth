import Modal from "./modal";
import { useEffect, useState } from "react";

export default function List({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="flex justify-center">
      <section className="grid grid-cols-2 gap-4 mb-5">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs"
          >
            <img
              className="rounded-t-base"
              src={course.coverImage}
              alt={course.title}
            />

            <div className="p-6 text-center">
              <span className="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
                🔥 Trending
              </span>

              <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">
                {course.title}
              </h5>

              <button
                onClick={() => {
                  setSelectedCourse(course);
                }}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
              >
                Purchase
              </button>
            </div>
          </div>
        ))}
      </section>
      <Modal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      ></Modal>
    </div>
  );
}
