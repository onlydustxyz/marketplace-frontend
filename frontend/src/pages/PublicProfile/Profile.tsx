type Props = {
  userLogin: string;
};

export default function Profile({ userLogin }: Props) {
  return <div className="flex w-full bg-orange-300">Profile {userLogin}</div>;
}
