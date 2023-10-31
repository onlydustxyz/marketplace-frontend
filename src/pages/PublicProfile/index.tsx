import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "src/components/Toaster";
import Tooltip from "src/components/Tooltip";
import Header from "./Header";
import Footer from "./Footer";
import Profile from "./Profile";
import { RoutePaths } from "src/App";
import { useShowToaster } from "src/hooks/useToaster";
import { useIntl } from "src/hooks/useIntl";
import SEO from "src/components/SEO";
import useRestfulProfile from "src/hooks/useRestfulProfile/useRestfulProfile";

const PublicProfilePage = () => {
  const { userLogin } = useParams();
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const navigate = useNavigate();
  const { data: userProfile, isLoading } = useRestfulProfile({ githubUserLogin: userLogin ?? "" });

  if (!userProfile && !isLoading) {
    showToaster(T("profile.error.notFound"), { isError: true });
    navigate(RoutePaths.Home);
  }

  return userProfile && userLogin ? (
    <>
      <SEO title={`${userProfile.login} — OnlyDust`} />
      <div className="bg-public-profile lg:h-[calc(100dvh)] lg:w-screen">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-between md:px-4">
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
