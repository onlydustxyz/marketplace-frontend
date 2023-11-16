import { UseFormReturn } from "react-hook-form";
import { CreateFormData } from "../types/ProjectCreationType";

export const useAutoSave = (
  form: UseFormReturn<CreateFormData, unknown>,
  setStorage: (values: CreateFormData) => void
) => {
  const { watch } = form;
  const values = watch();
  console.log("WATCH", values);

  //   const debouncedFormValue = useDebounce<CreateFormData | undefined>(values, 500);

  //   useEffect(() => {
  //     console.log("NEED TO SAVE", debouncedFormValue);
  //   }, [debouncedFormValue]);
};
