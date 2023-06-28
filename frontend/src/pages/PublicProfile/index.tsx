import { useParams } from "react-router-dom";
import { Toaster } from "src/components/Toaster";
import Tooltip from "src/components/Tooltip";
import Header from "./Header";
import Footer from "./Footer";
import Profile from "./Profile";

const PublicProfilePage = () => {
  const { userLogin } = useParams();

  return (
    userLogin && (
      <>
        <div className="h-screen w-screen bg-public-profile">
          <div className=" h-full flex flex-col justify-between px-40">
            <Header userLogin={userLogin} />
            <Profile userLogin={userLogin} />
            <Footer />
          </div>{" "}
        </div>
        <Toaster />
        <Tooltip />
      </>
    )
  );
};

export default PublicProfilePage;
