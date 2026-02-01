export default function Lectures({ lectures }) {
  return (
    <ul className="full-w divide-y divide-default">
      {lectures.map((lec) => (
        <li className="pb-3 sm:pb-4" key={lec}>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src="/globe.svg"
                alt="Profile"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-heading truncate">{lec}</p>
              <p className="text-sm text-body truncate">email@flowbite.com</p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-heading">
              $320
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
