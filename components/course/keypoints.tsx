"use client";
import { useState, useEffect } from "react";
import { useWeb3 } from "@components/provider/web3";
import { useAdminFeatures } from "./services/useAdmin";
import ModalAdmin from "./Modal";

export default function Keypoints({ lectures }) {
  const { hooks } = useWeb3();
  const [contractBalance, setContractBalance] = useState(0);
  const [contractOwner, setContractOwner] = useState("");
  const [option, setOption] = useState<any>(null);
  const [isStopped, setIsStopped] = useState(null);

  const {
    getOwner,
    getStatusContract,
    enableDisableStatusContract,
    withdrawAllAndShutdown,
  } = useAdminFeatures();

  const onChangeDisableSmartContract = async () => {
    debugger;
    const result = await enableDisableStatusContract();
    console.log("result", result);
  };

  const displayContractFlag = () => {
    if (isStopped === null) {
      return;
    } else {
      return (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={!!isStopped}
            onChange={onChangeDisableSmartContract}
            className="sr-only peer"
          />
          <div className="relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
        </label>
      );
    }
  };

  const onClickShutdown = async () => {
    await withdrawAllAndShutdown();
  };

  useEffect(() => {
    const getAdminInfo = async () => {
      const owner = await getOwner();
      setContractOwner(owner?.owner);
    };
    getAdminInfo();
  }, [contractOwner, contractBalance]);

  useEffect(() => {
    const getContractInfo = async () => {
      const flag = await getStatusContract();
      setIsStopped(flag?.stopped);
    };
    getContractInfo();
  }, [contractOwner, contractBalance]);

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
    <>
      <section>
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <dt>
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
                          d="M12 1v22M16 6a4 4 0 01-8 0 4 4 0 018 0zm0 12a4 4 0 01-8 0 4 4 0 018 0z"
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
                    <div className="absolute flex items-center justify-center  h-15 w-5 rounded-md text-white">
                      <button
                        type="button"
                        onClick={() => {
                          setOption({ type: "address" });
                        }}
                        className="text-fg-brand bg-neutral-primary border border-brand  hover:bg-brand hover:text-white focus:ring-4 focus:ring-brand-subtle font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                      >
                        Change
                      </button>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-white-900">
                      Set new Owner
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-200">
                    {contractOwner}
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
                    {displayContractFlag()}
                  </dd>
                </div>
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-white">
                      <button
                        onClick={() => {
                          setOption({ type: "withdraw" });
                        }}
                        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-heading focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                      >
                        <span className=" relative px-4 py-2.5 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">
                          W
                        </span>
                      </button>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-white-900">
                      Withdraw Specific Amout & Withdraw All
                    </p>
                  </dt>
                </div>
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md  text-white">
                      <button
                        onClick={onClickShutdown}
                        className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      >
                        <span className=" relative px-4 py-2.5 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">
                          S
                        </span>
                      </button>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-white-900">
                      Shutdown Smart Contract and Withdraw all
                    </p>
                  </dt>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
      <ModalAdmin option={option} onClose={() => setOption(null)}></ModalAdmin>
    </>
  );
}
