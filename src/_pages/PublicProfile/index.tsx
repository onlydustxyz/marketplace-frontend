"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import UsersApi from "src/api/Users";
import { FetchError } from "src/api/query.type";
import { useQueriesErrorBehavior } from "src/api/useQueriesError";
import SEO from "src/components/SEO";
import { Toaster } from "src/components/Toaster";
import Tooltip from "src/components/Tooltip";
import { usePosthog } from "src/hooks/usePosthog";

import Footer from "./Footer";
import Header from "./Header";
import Profile from "./Profile";

const PublicProfilePage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { capture } = usePosthog();

  const { data: userProfile, ...restUserProfileByGithubLoginQueries } = UsersApi.queries.useUserProfileByGithubLogin({
    params: { login: slug },
    options: { retry: 1 },
  });

  useEffect(() => {
    if (userProfile) {
      capture("contributor_viewed", { id: userProfile.githubUserId, type: "full" });
    }
  }, [userProfile]);

  const errorHandlingComponent = useQueriesErrorBehavior({
    queries: {
      error: restUserProfileByGithubLoginQueries.error as FetchError,
      isError: restUserProfileByGithubLoginQueries.isError,
      refetch: restUserProfileByGithubLoginQueries.refetch,
    },
  });

  if (errorHandlingComponent) {
    return errorHandlingComponent;
  }

  return userProfile && slug ? (
    <>
      <SEO title={`${userProfile.login} — OnlyDust`} />
      <div className="bg-public-profile lg:h-[calc(100dvh)] lg:w-screen">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-between md:px-4">
          <Header userLogin={slug} />
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
