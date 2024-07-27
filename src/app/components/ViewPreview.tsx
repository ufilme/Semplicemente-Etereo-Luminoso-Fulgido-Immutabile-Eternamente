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
      className={
        props.viewbg +
        " " +
        props.hoverbg +
        " home-view w-full h-full mb-6 flex flex-col justify-center items-center rounded-3xl"
      }
      id={props.id}
    >
      <h2 className="text-3xl font-bold">{props.title}</h2>
      <p className="text-lg font-medium">{props.p}</p>
    </div>
  );
}
