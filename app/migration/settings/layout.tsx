"use client";

import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Sidebar } from "app/migration/settings/components/sidebar";

import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

const BillingPage = lazy(() => import("./billing/page"));
const PayoutPage = lazy(() => import("./payout/page"));
const ProfilePage = lazy(() => import("./profile/page"));
export default function SettingsLayout() {
  return (
    <div className="flex h-full w-screen flex-col overflow-hidden border-[24px] border-t-0 border-black">
      <div className="flex h-0 w-full flex-1 flex-col gap-4 overflow-hidden pt-4 xl:flex-row xl:gap-2 xl:pt-0">
        <Sidebar />

        <div className="relative h-full w-full overflow-hidden xl:rounded-r-2xl">
          <ScrollView>
            <div className="mx-auto flex max-w-7xl flex-1 flex-col gap-4 px-4 py-6 pb-32 xl:px-8">
              <Routes>
                <Route path="/" element={<Navigate replace to="/settings/profile" />} />
                <Route
                  path="/profile"
                  element={
                    <Suspense>
                      <ProfilePage />
                    </Suspense>
                  }
                />
                <Route
                  path="/billing"
                  element={
                    <Suspense>
                      <BillingPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/payout"
                  element={
                    <Suspense>
                      <PayoutPage />
                    </Suspense>
                  }
                />
              </Routes>
            </div>
          </ScrollView>
        </div>
      </div>
    </div>
  );
}
