import { useUserProfileQuery } from "src/__generated/graphql";
import View from "./View";

type Props = {
  githubUserId: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function ContributorProfileSidePanel({ githubUserId, ...rest }: Props) {
  const { data } = useUserProfileQuery({ variables: { githubUserId } });

  return data?.githubUsersByPk ? <View {...rest} {...data?.githubUsersByPk} /> : <div />;
}
