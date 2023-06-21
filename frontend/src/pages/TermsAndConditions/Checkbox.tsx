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
        className="w-5 h-5 bg-white/8 hover:bg-white/2 rounded border border-greyscale-50/20 cursor-pointer accent-spacePurple-700 checked:focus:spacePurple-600"
      />
    </>
  );
}
