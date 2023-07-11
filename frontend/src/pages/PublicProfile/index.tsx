import { Navigate, useParams } from "react-router-dom";
import { Toaster } from "src/components/Toaster";
import Tooltip from "src/components/Tooltip";
import Header from "./Header";
import Footer from "./Footer";
import Profile from "./Profile";
import useUserProfile from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/useUserProfile";
import { RoutePaths } from "src/App";
import { useShowToaster } from "src/hooks/useToaster";
import { useIntl } from "src/hooks/useIntl";

const PublicProfilePage = () => {
  const { userLogin } = useParams();
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { data: userProfile, loading } = useUserProfile({ githubUserLogin: userLogin });

  if (!loading && (!userProfile || !userLogin)) {
    showToaster(T("profile.error.notFound"), { isError: true });
  }

  return loading ? (
    <></>
  ) : userProfile && userLogin ? (
    <>
      <div className="bg-public-profile lg:h-[calc(100dvh)] lg:w-screen">
        <div className="lg:max-5xl xl:max-6xl mx-auto flex h-full flex-col justify-between md:container md:px-4 2xl:max-w-7xl">
          <Header userLogin={userLogin} />
          <Profile userProfile={userProfile} />
          <Footer />
        </div>
      </div>
      <Toaster />
      <Tooltip />
    </>
  ) : (
    <Navigate to={RoutePaths.Home} />
  );
};

export default PublicProfilePage;
