import { useWeb3 } from "@components/provider/web3";

export default function Walletbar() {
  const { connect, accounts, balance } = useWeb3();

  const { hooks } = useWeb3();
  const { account } = hooks.useAccount();

  const hasAccount =
    Array.isArray(accounts) && accounts.length > 0 && accounts[0];

  return (
    <div className="w-full text-center bg-neutral-primary-soft p-6 py-[10px] border border-default rounded-base shadow-xs my-6">
      {account}

      <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
        <a
          href="#"
          className="w-full sm:w-auto bg-dark hover:bg-dark-strong focus:ring-4 focus:outline-none focus:ring-neutral-quaternary text-white rounded-base inline-flex items-center justify-center px-4 py-3"
        >
          <svg
            className="w-7 h-7 me-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 417"
            fill="currentColor"
          >
            <path d="M127.9 0L124.8 11v279l3.1 3.1 127.9-73.9-131-209.2zM127.9 0L-0.1 211l127.9 73.9V0zM127.9 317.5L123.9 322V417l4 0 127.9-183.6-127.9 84.1zM127.9 317.5L0 233.4 127.9 317.5z" />
          </svg>
          <div className="text-left rtl:text-right">
            <div className="text-xs">ETH</div>
            <div className="text-sm font-bold">{balance}</div>
          </div>
        </a>
        <a
          href="#"
          className="w-full sm:w-auto bg-dark hover:bg-dark-strong focus:ring-4 focus:outline-none focus:ring-neutral-quaternary text-white rounded-base inline-flex items-center justify-center px-4 py-3"
        >
          <svg
            className="w-7 h-7 me-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7z" />
            <path d="M21 12H3" />
          </svg>
          <div className="text-left rtl:text-right">
            <div className="text-xs">0.004769 = 15$</div>
            <div className="text-sm font-bold">Price per course</div>
          </div>
        </a>
      </div>
    </div>
  );
}
