interface TermsAndConditionsCheckBoxProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

export default function TermsAndConditionsCheckBox({ checked, setChecked }: TermsAndConditionsCheckBoxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={() => setChecked(!checked)}
      className="w-5 h-5 bg-white/8 hover:bg-white/2 checked:bg-spacePurple-500 rounded border border-greyscale-50/20 checked:border-spacePurple-700 focus:ring-0 focus:ring-offset-0 cursor-pointer enabled:ring-0 checked:focus:bg-spacePurple-500 checked:hover:bg-spacePurple-500/90  checked:hover:border-spacePurple-700"
    />
  );
}
