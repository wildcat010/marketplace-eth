"use client";
import { useEffect, useState } from "react";

export default function Modal({ course, onClose }) {
  useEffect(() => {}, [course]);

  return (
    <section>
      <div
        className={`${!course && "hidden"} fixed z-10 inset-0 overflow-y-auto"`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom   rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-white"
                    id="modal-title"
                  >
                    {course?.title}
                  </h3>
                  <div className="flex justify-between items-center my-4">
                    <span className="text-gray-300">
                      author: {course?.author}
                    </span>

                    <span className="text-gray-400">Type: {course?.type}</span>
                  </div>
                  <img
                    className="rounded-t-base"
                    src={course?.coverImage}
                    alt={course?.title}
                  />
                  <p className="my-6 text-gray-300">{course?.description}</p>

                  <div className="mt-2">
                    {course?.wsl.map((wsl) => (
                      <p className="text-sm text-gray-300">{wsl}</p>
                    ))}
                  </div>

                  <a className="w-full sm:w-auto bg-dark my-6 hover:bg-dark-strong focus:ring-4 focus:outline-none focus:ring-neutral-quaternary text-white rounded-base inline-flex items-center justify-center px-4 py-3">
                    <svg
                      className="w-7 h-7 me-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 417"
                      fill="currentColor"
                    >
                      <path d="M127.9 0L124.8 11v279l3.1 3.1 127.9-73.9-131-209.2zM127.9 0L-0.1 211l127.9 73.9V0zM127.9 317.5L123.9 322V417l4 0 127.9-183.6-127.9 84.1zM127.9 317.5L0 233.4 127.9 317.5z" />
                    </svg>
                    <div className="text-left rtl:text-right">
                      <div className="text-xs">15$</div>
                      <div className="text-sm font-bold">Price per course</div>
                    </div>
                  </a>
                  <div>
                    <label className="block mb-2.5 text-sm font-medium text-heading">
                      Email
                    </label>
                    <input
                      type="text"
                      id="visitors"
                      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="text-white mx-5  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
              >
                Purchase
              </button>
              <button
                type="button"
                onClick={onClose}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
