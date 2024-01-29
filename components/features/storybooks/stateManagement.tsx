import React, { useState } from "react";

export const StoryState = ({
  children,
  initial,
}: {
  // eslint-disable-next-line
  children: (state: any, setState: (state: any) => void) => JSX.Element;
  // eslint-disable-next-line
  initial: any;
}) => {
  const [state, setState] = useState(initial);
  return <div>{children(state, setState)}</div>;
};

export default StoryState;
