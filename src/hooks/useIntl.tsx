"use client";

import { PropsWithChildren } from "react";
import { Autocomplete, TParams, Talkr, tr, useT } from "talkr";

import en_base from "src/translations/en.json";
import en_commons from "src/translations/v2/en/commons/commons.json";
import en_commons_enum from "src/translations/v2/en/commons/enums.json";
import en_features_banners from "src/translations/v2/en/features/banners.json";
import en_features_contributors from "src/translations/v2/en/features/contributors.json";
import en_features_ecosystems from "src/translations/v2/en/features/ecosystems.json";
import en_features from "src/translations/v2/en/features/features.json";
import en_features_filters from "src/translations/v2/en/features/filters.json";
import en_features_invoice_template from "src/translations/v2/en/features/invoice-template.json";
import en_features_leaders from "src/translations/v2/en/features/leaders.json";
import en_features_menu from "src/translations/v2/en/features/menu.json";
import en_features_payout_status from "src/translations/v2/en/features/payout-status.json";
import en_features_sidebar from "src/translations/v2/en/features/sidebar.json";
import en_features_verify from "src/translations/v2/en/features/verify.json";
import en_projects from "src/translations/v2/en/pages/projects.json";
import en_settings_billing from "src/translations/v2/en/pages/settings-billing.json";
import en_settings_payout from "src/translations/v2/en/pages/settings-payout.json";
import en_settings_profile from "src/translations/v2/en/pages/settings-profile.json";
import en_stack_request_payments from "src/translations/v2/en/pages/stacks-request-payments.json";

const en = {
  ...en_base,
  v2: {
    commons: {
      ...en_commons,
      enums: en_commons_enum,
    },
    features: {
      ...en_features,
      filters: en_features_filters,
      banners: en_features_banners,
      contributors: en_features_contributors,
      leaders: en_features_leaders,
      ecosystems: en_features_ecosystems,
      payoutStatus: en_features_payout_status,
      sidebar: en_features_sidebar,
      invoiceTemplate: en_features_invoice_template,
      verify: en_features_verify,
      menu: en_features_menu,
    },
    pages: {
      projects: en_projects,
      settings: {
        profile: en_settings_profile,
        billing: en_settings_billing,
        payout: en_settings_payout,
      },
      stacks: {
        request_payments: en_stack_request_payments,
      },
    },
  },
};

export type Key = Autocomplete<typeof en>;

export const IntlProvider = ({ children }: PropsWithChildren) => (
  <Talkr languages={{ en }} defaultLanguage="en">
    {children}
  </Talkr>
);

export const useIntl = () => {
  const { locale, setLocale, languages, defaultLanguage } = useT();
  return {
    setLocale,
    locale,
    T: (key: Key, params?: TParams) => tr({ locale, languages, defaultLanguage }, key, params),
  };
};
