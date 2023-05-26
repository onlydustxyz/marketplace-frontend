import { GithubUserFragment } from "src/__generated/graphql";
import SidePanel from "src/components/SidePanel";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
} & GithubUserFragment;

export default function View({ login, avatarUrl, htmlUrl, ...rest }: Props) {
  return <SidePanel {...rest} title={login} />;
}
