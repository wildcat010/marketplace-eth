"use client";
import { useState, useEffect } from "react";
import { useWeb3 } from "@components/provider/web3";

export default function Keypoints({ lectures }) {
  const { hooks } = useWeb3();
  const [contractBalance, setContractBalance] = useState(0);

  useEffect(() => {
    console.log("lectures", lectures.length);
  }, []);

  useEffect(() => {
    const loadNetwork = async () => {
      if (!hooks.useNetwork) return;

      const network = await hooks.useNetwork(); // call the async function

      if (network && network.contractBalanceWei !== null) {
        setContractBalance(network.contractBalanceWei);
      }
    };

    loadNetwork();
  }, [hooks.useNetwork]);

  return (
    <section>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white-900">
                    Total Number of Courses
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-200">
                  Courses: {lectures.length}
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white-900">
                    Set new Owner
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-200">Owner</dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-emerald-700 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white-900">
                    Contract Balance
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-200">
                  Balance: {contractBalance} ETH
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-emerald-700 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white-900">
                    Disable Smart Contract
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-200">
                  isStopped
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-amber-600 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white-900">
                    Withdraw Specific Amout & Withdraw All
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-200">Withdraw</dd>
              </div>
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-700 text-white">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white-900">
                    Shutdown Smart Contract and Withdraw all
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-200">shutdown</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
