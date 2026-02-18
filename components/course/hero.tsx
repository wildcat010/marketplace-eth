"use client";
import { useState, useEffect } from "react";
import { useWeb3 } from "@components/provider/web3";

export default function Hero() {
  const { hooks } = useWeb3();

  const [email, setEmail] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useState(email);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const getEmailToCourses = async () => {
      if (!hooks.useCoursesByEmail) return;

      console.log("hooks", hooks);

      const coursesByEmail = await hooks.useCoursesByEmail(); // call the async function

      console.log("coursesByEmail", coursesByEmail);

      if (coursesByEmail) {
      }
    };

    getEmailToCourses();
  }, [hooks.useCoursesByEmail]);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedEmail(email); // update after user stops typing
      console.log("Debounced email:", email);
      console.log("valid email", isValidEmail(email));
      setIsValid(isValidEmail(email));
    }, 300);

    return () => clearTimeout(handler); // cancel if user types again
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted email:", e);
  };

  return (
    <section>
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Customer Search</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Enter your email to find all the courses purchased by this
                  email
                </p>
              </div>
              <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                >
                  Find Courses
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}
