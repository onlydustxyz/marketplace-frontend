import React, { ChangeEventHandler } from "react";

type Props = {
  setFile: (file: number[]) => void;
};

const FileInput = React.forwardRef<HTMLInputElement, Props>(function FileInput({ setFile }, ref) {
  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { files, validity } }) => {
    if (validity.valid && files) {
      const reader = new FileReader();

      reader.onload = function () {
        if (this.result) {
          const data = new Uint8Array(this.result as ArrayBuffer);
          setFile(Array.from(data));
        }
      };

      reader.readAsArrayBuffer(files[0]);
    }
  };

  return <input type="file" ref={ref} style={{ display: "none" }} onChange={onChange} />;
});

export default FileInput;
