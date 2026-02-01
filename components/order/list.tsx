export default function List({ courses }) {
  return (
    <div className="flex justify-center">
      <section className="grid grid-cols-2 gap-4 mb-5">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs"
          >
            <a href="#">
              <img
                className="rounded-t-base"
                src={course.coverImage}
                alt={course.title}
              />
            </a>
            <div className="p-6 text-center">
              <span className="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
                🔥 Trending
              </span>
              <a href="#">
                <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">
                  {course.title}
                </h5>
              </a>
              <a
                href="#"
                className="inline-flex items-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
