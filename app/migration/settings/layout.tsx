"use client";

import { Navigate, Route, Routes } from "react-router-dom";

import { Sidebar } from "app/migration/settings/components/sidebar";

import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

import BillingPage from "./billing/page";
import PayoutPage from "./payout/page";
import ProfilePage from "./profile/page";

export default function SettingsLayout() {
  return (
    <div className="flex h-full w-screen flex-col overflow-hidden">
      <div className="flex h-0 w-full flex-1 flex-col gap-4 overflow-hidden pt-4 xl:flex-row xl:gap-2 xl:p-6 xl:pt-0">
        <Sidebar />

        <div className="od-space-background relative h-full w-full overflow-hidden xl:rounded-r-2xl">
          <ScrollView>
            <div className="mx-auto flex max-w-7xl flex-1 flex-col gap-4 px-4 py-6 pb-32 xl:px-8">
              <Routes>
                <Route path="/" element={<Navigate replace to="/settings/profile" />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/billing" element={<BillingPage />} />
                <Route path="/payout" element={<PayoutPage />} />
              </Routes>
            </div>
          </ScrollView>
        </div>
      </div>
    </div>
  );
}
