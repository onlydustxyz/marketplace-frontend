import { useParams } from "react-router-dom";
import { Toaster } from "src/components/Toaster";
import Tooltip from "src/components/Tooltip";

const PublicProfilePage = () => {
  const { userLogin } = useParams();

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-space">{userLogin}</div>
      <Toaster />
      <Tooltip />
    </>
  );
};

export default PublicProfilePage;
