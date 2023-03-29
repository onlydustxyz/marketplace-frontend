import classNames from "classnames";

type Props = {
  defaultTitle: string;
  title: string;
  setTitle: (title: string) => void;
};

export default function Title({ defaultTitle, title, setTitle }: Props) {
  return (
    <input
      data-testid="other-work-title"
      value={title}
      placeholder={defaultTitle}
      className={classNames(
        "w-full py-3 px-4",
        "border border-greyscale-50/8 outline-none rounded-xl bg-white/5",
        "font-walsheim font-normal text-base text-greyscale-50 placeholder:text-greyscale-500"
      )}
      onChange={({ target }) => setTitle(target.value)}
    />
  );
}
