"use client";
import { useWeb3 } from "@components/provider/web3";
import { useEffect, useState } from "react";
import { getAllCourse } from "@components/course/content/fetcher";

export default function Card() {
  const { hooks } = useWeb3();
  const [nbrCourses, setNbrCourses] = useState(0);
  const [courses, setCourses] = useState([]);
  const { data, courseMap } = getAllCourse();

  useEffect(() => {
    const loadNetwork = async () => {
      if (!hooks.useOwnedCourses) return;

      const courses = await hooks.useOwnedCourses(); // call the async function

      if (courses) {
        setNbrCourses(courses.ownedCourses);
        setCourses(courses.courses);
      }
    };

    loadNetwork();
  }, [hooks.useOwnedCourses]);

  return (
    <div className="w-full  mx-auto p-6 bg-neutral-primary-soft border border-default rounded-base shadow-xs my-6">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-semibold leading-none text-heading">
          Last Courses Bought: {nbrCourses}
        </h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-default">
          {courses
            .filter((course: any, index, self) => {
              return (
                self.findIndex((c: any) => c.courseId === course.courseId) ===
                index
              );
            })
            .map((course: any, index) => {
              const courseData = data.find((c: any) => {
                return c.id == course.courseId;
              });
              return (
                <li key={index} className="py-4 sm:py-4">
                  <div className="flex items-center gap-2">
                    <div className="shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="./globe.svg"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-2">
                      <p className="font-medium text-heading truncate">
                        {courseData?.title}
                      </p>
                    </div>
                    <div className="inline-flex items-center font-medium text-heading">
                      {courseData?.type}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
