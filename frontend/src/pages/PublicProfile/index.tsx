import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "src/components/Toaster";
import Tooltip from "src/components/Tooltip";
import Header from "./Header";
import Footer from "./Footer";
import Profile from "./Profile";
import useUserProfile from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/useUserProfile";
import { RoutePaths } from "src/App";
import { useShowToaster } from "src/hooks/useToaster";
import { useIntl } from "src/hooks/useIntl";
import { Helmet } from "react-helmet";
import config from "src/config";

const PublicProfilePage = () => {
  const { userLogin } = useParams();
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const navigate = useNavigate();
  const { data: userProfile, loading } = useUserProfile({ githubUserLogin: userLogin });

  if (!userProfile && !loading) {
    showToaster(T("profile.error.notFound"), { isError: true });
    navigate(RoutePaths.Home);
  }

  return userProfile && userLogin ? (
    <>
      <Helmet>
        <title>{`${userProfile.profile.login} — OnlyDust`}</title>
        <meta property="og:title" content={`${userProfile.profile.login} — OnlyDust`} data-react-helmet="true" />
        <meta property="og:url" content={`${config.ASSET_PATH}/u/${userLogin}`} data-react-helmet="true" />
        {userProfile.profile.bio && (
          <meta property="og:description" content={userProfile.profile.bio} data-react-helmet="true" />
        )}
      </Helmet>
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
    <></>
  );
};

export default PublicProfilePage;
