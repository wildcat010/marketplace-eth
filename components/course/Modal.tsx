"use client";
import { useEffect, useState } from "react";
import { useWeb3 } from "@components/provider/web3";
import { useAdminFeatures } from "./services/useAdmin";

export default function ModalAdmin({ option, onClose }) {
  const [address, setAddress] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const { setNewOwner, getOwner } = useAdminFeatures();

  const { web3 } = useWeb3();

  const renderInputByType = (option) => {
    switch (option?.type) {
      case "address":
        return (
          <div className="px-6 pt-6 pb-4 h-[200px] pr-2">
            <h3 className="text-xl font-semibold mb-3">Set new Owner</h3>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                placeholder="0x00000000..."
                required
              />
              {!isValid && address && (
                <p className="text-red-500 text-xs mt-1">Invalid address</p>
              )}
            </div>
          </div>
        );

      case "withdraw":
        return (
          <div className="px-6 pt-6 pb-4 h-[200px] pr-2">
            <h3 className="text-xl font-semibold mb-3">
              Set Amount to Withdraw
            </h3>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Enter Number
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={0}
                max={100}
                step={1}
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
              />
            </div>
          </div>
        );

      // Add more cases here
      default:
        return null; // render nothing if type is unknown
    }
  };

  const renderFooterByType = (option) => {
    switch (option?.type) {
      case "address":
        return (
          <>
            <button
              onClick={() => onClickSetNewContractOwner(address)}
              disabled={!isValid}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-base text-sm px-4 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-brand"
            >
              Change Owner
            </button>
            <button
              onClick={() => {
                setError("");
                onClose();
              }}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-base text-sm px-4 py-2.5"
            >
              Cancel
            </button>
          </>
        );

      case "withdraw":
        return (
          <>
            <button
              onClick={() => onClickWithdrawSome(amount)}
              disabled={amount <= 0}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-base text-sm px-4 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-brand"
            >
              Withdraw
            </button>
            <button
              onClick={() => {
                setError("");
                onClose;
              }}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-base text-sm px-4 py-2.5"
            >
              Cancel
            </button>
          </>
        );

      // Add more cases for other types
      default:
        return null;
    }
  };

  const onClickSetNewContractOwner = async (address) => {
    setError("");
    const response = await setNewOwner(address);
    if (response?.status == true) {
      //close
      onClose(); // close modal
    } else {
      setError(response?.error);
    }
  };

  const onClickWithdrawSome = async (address) => {
    //we need to make sure we have the found, its superior to 0
    //update the contract balance
  };

  const displaySpecificInput = (option) => {
    const { type } = option;
    switch (type) {
      case "address":
        break;
      case "withdraw":
        break;
    }
  };

  useEffect(() => {
    if (address) {
      const valid = web3.utils.isAddress(address);
      setIsValid(valid);
    } else {
      setIsValid(false);
    }
  }, [address]);

  if (!option) return null;

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
        {renderInputByType(option)}

        <p className="text-red-500 text-xs mt-1">{error}</p>
        <div className="bg-gray-700 px-6 py-4 flex justify-end gap-3">
          {renderFooterByType(option)}
        </div>
      </div>
    </section>
  );
}
