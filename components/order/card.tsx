export default function Card() {
  return (
    <div className="w-full  mx-auto p-6 bg-neutral-primary-soft border border-default rounded-base shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-semibold leading-none text-heading">
          Latest Customers
        </h5>
        <a href="#" className="font-medium text-fg-brand hover:underline">
          View all
        </a>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-default">
          <li className="py-4 sm:py-4">
            <div className="flex items-center gap-2">
              <div className="shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src="./globe.svg"
                  alt="Neil image"
                />
              </div>
              <div className="flex-1 min-w-0 ms-2">
                <p className="font-medium text-heading truncate">Order ID</p>
              </div>
              <div className="inline-flex items-center font-medium text-heading">
                $320
              </div>
            </div>
          </li>
          <li className="py-4 sm:py-4">
            <div className="flex items-center gap-2">
              <div className="shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src="./globe.svg"
                  alt="Bonnie image"
                />
              </div>
              <div className="flex-1 min-w-0 ms-2">
                <p className="font-medium text-heading truncate">Proof ID</p>
              </div>
              <div className="inline-flex items-center font-medium text-heading">
                $3467
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
