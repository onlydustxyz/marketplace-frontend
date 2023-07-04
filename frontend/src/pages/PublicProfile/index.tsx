import { Navigate, useParams } from "react-router-dom";
import { Toaster } from "src/components/Toaster";
import Tooltip from "src/components/Tooltip";
import Header from "./Header";
import Footer from "./Footer";
import Profile from "./Profile";
import useUserProfile from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/useUserProfile";
import { RoutePaths } from "src/App";

const PublicProfilePage = () => {
  const { userLogin } = useParams();
  const { data: userProfile, loading } = useUserProfile({ githubUserLogin: userLogin });

  return loading ? (
    <></>
  ) : userProfile && userLogin ? (
    <>
      <div className="bg-public-profile lg:h-screen lg:w-screen">
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
