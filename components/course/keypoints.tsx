"use client";
import { useState, useEffect } from "react";
import { useWeb3 } from "@components/provider/web3";
import { useAdminFeatures } from "./services/useAdmin";

export default function Keypoints({ lectures }) {
  const { hooks } = useWeb3();
  const [contractBalance, setContractBalance] = useState(0);
  const [contractOwner, setContractOwner] = useState("");

  const { setNewOwner, getOwner } = useAdminFeatures();

  useEffect(() => {
    const getAdminInfo = async () => {
      const owner = await getOwner();
      setContractOwner(owner?.owner);
    };
    getAdminInfo();
  }, [contractOwner, contractBalance]);

  const setNewContractOwner = async () => {
    const response = await setNewOwner(
      "0xCB7A85a46011152B23Ed230443d32D1DA33b8499",
    );
    if (response?.status == "success") {
      setContractOwner(response.owner);
    }
  };

  useEffect(() => {
    const loadNetwork = async () => {
      if (!hooks.useNetwork) return;

      const network = await hooks.useNetwork(); // call the async function

      if (network && network.contractBalanceWei !== null) {
        const owner = await getOwner();
        setContractBalance(network.contractBalanceWei);
        setContractOwner(owner?.owner);
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
                <dd className="mt-2 ml-16 text-base text-gray-200">
                  {contractOwner}
                  <button
                    onClick={setNewContractOwner}
                    type="button"
                    className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                  >
                    Default
                  </button>
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
