interface TermsAndConditionsCheckBoxProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

export default function TermsAndConditionsCheckBox({ checked, setChecked }: TermsAndConditionsCheckBoxProps) {
  return (
    <>
      <input
        id="checkbox"
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="checked:focus:spacePurple-600 h-5 w-5 cursor-pointer rounded border border-greyscale-50/20 bg-white/8 accent-spacePurple-700 hover:bg-white/2"
      />
    </>
  );
}
