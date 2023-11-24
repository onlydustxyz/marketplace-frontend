import UseWatch from "../hooks/useWatchPanel";

export const Modal = (props: { name: string }) => {
  const modal = UseWatch(props.name);
  console.log("modal", modal, props.name);
  return (
    <div className="border border-blue-300 p-2">
      <p>{modal?.name}</p>
      <p>{modal?.open ? "is open" : "is close"}</p>
      {modal?.children}
    </div>
  );
};
