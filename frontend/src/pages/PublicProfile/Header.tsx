type Props = {
  userLogin: string;
};

export default function Header({ userLogin }: Props) {
  return (
    <div className="flex items-center py-6 bg-red-400">
      <div className="flex w-full justify-between px-3 py-4">
        <div className="flex">Left {userLogin}</div>
        <div className="flex">Right</div>
      </div>
    </div>
  );
}
