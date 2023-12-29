export default function DynamicPage(props: { params: { id: string } }) {
  return (
    <div>
      <h1>Dynamic Page</h1>
      <p>Dynamic page with id: {props.params.id}</p>
    </div>
  );
}
