import { useGetRegisteredUserQuery } from "src/__generated/graphql";
import { TokenSetUser, User } from "src/types";

export const useUser = (tokenUser: TokenSetUser | null): User | null => {
  const getUserQuery = useGetRegisteredUserQuery({
    variables: {
      id: tokenUser?.id,
    },
    skip: !tokenUser,
  });

  const registeredUser = getUserQuery.data?.registeredUsers.at(0);

  return (
    tokenUser && {
      ...tokenUser,
      login: registeredUser?.login || "???",
      avatarUrl: registeredUser?.avatarUrl || "",
    }
  );
};
