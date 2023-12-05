import React, { ChangeEventHandler } from "react";

type Props = {
  setFile: (file: File) => Promise<void>;
};

const FileInput = React.forwardRef<HTMLInputElement, Props>(function FileInput({ setFile }, ref) {
  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.validity.valid && target.files) {
      setFile(target.files[0]);
      target.value = "";
    }
  };

  return (
    <input
      data-testid="avatarFileInput"
      type="file"
      ref={ref}
      style={{ display: "none" }}
      onChange={onChange}
      accept="image/*"
    />
  );
});

export default FileInput;
