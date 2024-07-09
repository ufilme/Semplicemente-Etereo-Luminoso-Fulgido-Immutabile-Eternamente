export function ViewPreview(props) {

  return (
    <div className="home-view" id={props.id}>
        <h2>{props.title}</h2>
        <p>{props.p}</p>
    </div>
  );
}
