"use client";
import { useEffect, useState } from "react";
import { usePurchase } from "./usePurchase";

export default function Modal({ course, onClose }) {
  useEffect(() => {}, [course]);
  const { purchaseCourse } = usePurchase();

  const handlePurchase = async () => {
    try {
      const tx = await purchaseCourse(course, "test@gmail.com");
      console.log("Transaction Success", tx);

      onClose(); // close modal
    } catch (err) {
      alert("Purchase failed");
    }
  };

  if (!course) return null;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay behind modal */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose} // close modal on click outside
      ></div>

      {/* Modal box */}
      <div className="relative bg-gray-800 text-white rounded-lg shadow-xl sm:max-w-lg w-full z-10">
        {/* Scrollable content */}
        <div className="px-6 pt-6 pb-4 h-[400px] overflow-y-scroll pr-2">
          <h3 className="text-xl font-semibold mb-3">{course?.title}</h3>

          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-300">Author: {course?.author}</span>
            <span className="text-gray-400">Type: {course?.type}</span>
          </div>

          <img
            className="rounded mb-4"
            src={course?.coverImage}
            alt={course?.title}
          />

          <p className="text-gray-300 mb-4">{course?.description}</p>

          <div className="mb-6">
            {course?.wsl.map((wsl, index) => (
              <p className="text-sm text-gray-300" key={index}>
                {wsl}
              </p>
            ))}
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="text"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
              placeholder=""
              required
            />
          </div>
        </div>

        {/* Footer buttons */}
        <div className="bg-gray-700 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={handlePurchase}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-base text-sm px-4 py-2.5"
          >
            Purchase
          </button>
          <button
            onClick={onClose}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-base text-sm px-4 py-2.5"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}
