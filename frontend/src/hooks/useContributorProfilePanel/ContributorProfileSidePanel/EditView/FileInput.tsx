import React, { ChangeEventHandler } from "react";

type Props = {
  setFile?: (file: File) => Promise<void>;
};

const FileInput = React.forwardRef<HTMLInputElement, Props>(function FileInput({ setFile }, ref) {
  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.validity.valid && target.files && setFile) {
      setFile(target.files[0]);
      target.value = "";
    }
  };

  return <input type="file" ref={ref} style={{ display: "none" }} onChange={onChange} />;
});

export default FileInput;
