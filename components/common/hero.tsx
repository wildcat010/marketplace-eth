"use client";
import { useWeb3 } from "@components/provider/web3";
import { useEffect, useState } from "react";

export default function Hero() {
  const { hooks } = useWeb3();
  const [network, setNetwork] = useState("");
  const [isValidNetwork, setIsValidNetwork] = useState(false);

  useEffect(() => {
    const loadNetwork = async () => {
      if (!hooks.useNetwork) return;

      const network = await hooks.useNetwork(); // call the async function

      if (network && network.network) {
        setNetwork(network.network);
        setIsValidNetwork(network.isValidNetwork);
      }
    };

    loadNetwork();
  }, [hooks.useNetwork]);

  return (
    <section className="bg-neutral-primary">
      <div className="py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tighter text-heading md:text-5xl lg:text-6xl">
          Courses
        </h1>
        <p className="mb-8 text-base font-normal text-body md:text-xl">
          Grow your career as a developer.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 md:space-x-4 text-gray-200">
          Connected to network: {network ? network : "Searching ..."}
        </div>

        {isValidNetwork ? (
          ""
        ) : (
          <span className="text-gray-400">
            You Need to connect on the Sepola Network for the app to work.
          </span>
        )}
      </div>
    </section>
  );
}
