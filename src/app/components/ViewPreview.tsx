import PropTypes from "prop-types";

export function ViewPreview(props: {
  viewbg: string;
  hoverbg: string;
  title: string;
  p: string;
  id: string;
}) {
  return (
    <div
      className={`${props.viewbg} ${props.hoverbg} home-view w-full h-40 sm:h-72 md:h-[38vh] flex flex-col justify-center items-center text-center rounded-3xl p-4`}
      id={props.id}
    >
      <h2 className="text-2xl sm:text-3xl font-bold">{props.title}</h2>
      <p className="text-base sm:text-lg font-medium">{props.p}</p>
    </div>
  );
}