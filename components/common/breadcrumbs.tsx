export default function Breadcrumps() {
  return (
    <div className="flex justify-center my-6">
      <div
        className="inline-flex rounded-base shadow-xs -space-x-px"
        role="group"
      >
        <button
          type="button"
          className="text-body bg-neutral-primary-soft border border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-3 focus:ring-neutral-tertiary-soft font-medium leading-5 rounded-s-base text-sm px-3 py-2 focus:outline-none"
        >
          Buy
        </button>
        <button
          type="button"
          className="text-body bg-neutral-primary-soft border border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-3 focus:ring-neutral-tertiary-soft font-medium leading-5 text-sm px-3 py-2 focus:outline-none"
        >
          My Orders
        </button>
        <button
          type="button"
          className="text-body bg-neutral-primary-soft border border-default hover:bg-neutral-secondary-medium hover:text-heading focus:ring-3 focus:ring-neutral-tertiary-soft font-medium leading-5 rounded-e-base text-sm px-3 py-2 focus:outline-none"
        >
          All Orders
        </button>
      </div>
    </div>
  );
}
