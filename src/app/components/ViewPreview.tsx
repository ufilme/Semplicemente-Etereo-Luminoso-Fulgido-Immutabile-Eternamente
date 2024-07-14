import PropTypes from 'prop-types'

export function ViewPreview(props) {

  return (
    <div className= {props.viewbg + " " + props.hoverbg + " home-view w-full h-full mb-6 flex flex-col justify-center items-center rounded-3xl"} id={props.id}>
        <h2 className="text-3xl font-bold">{props.title}</h2>
        <p className="text-lg font-medium">{props.p}</p>
    </div>
  );
}

ViewPreview.propTypes = {
  viewbg: PropTypes.string,
  hoverbg: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  p: PropTypes.string,
}

ViewPreview.defaultProps = {
  viewbg: "bg-gray-500",
  hoverbg: "bg-gray-600",
  id: "default-id",
  title: "Title",
  p: "Paragraph",
}