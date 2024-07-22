import en_features_public_repo_scope_permissions from "translations/v2/en/features/github-permissions/public-repo-scope-permissions.json";
import en_features_read_write_issue_permissions from "translations/v2/en/features/github-permissions/read-write-issue-permissions.json";

import en_base from "../en.json";
import en_commons from "./en/commons/commons.json";
import en_commons_enum from "./en/commons/enums.json";
import en_features_activity_graph from "./en/features/activity-graph.json";
import en_features_banners from "./en/features/banners.json";
import en_features_billings_profile from "./en/features/billingsProfile.json";
import en_features_contributors from "./en/features/contributors.json";
import en_features_currency from "./en/features/currency.json";
import en_features_details_accordion from "./en/features/details-accordion.json";
import en_features_dots_status from "./en/features/dots-status.json";
import en_features_ecosystems from "./en/features/ecosystems.json";
import en_features from "./en/features/features.json";
import en_features_filters from "./en/features/filters.json";
import en_features_hackathon_card from "./en/features/hackathon-card.json";
import en_features_leaders from "./en/features/leaders.json";
import en_features_menu from "./en/features/menu.json";
import en_features_payout_status from "./en/features/payout-status.json";
import en_features_profile_card from "./en/features/profile-card.json";
import en_features_project_side_overview from "./en/features/project-side-overview.json";
import en_features_projects_apply_issue_drawer from "./en/features/projects/apply-issue-drawer.json";
import en_features_roles from "./en/features/roles.json";
import en_features_sidebar from "./en/features/sidebar.json";
import en_features_table from "./en/features/table.json";
import en_features_verify from "./en/features/verify.json";
import en_applications from "./en/pages/applications";
import en_billing_create from "./en/pages/billing-create-stacks.json";
import en_billing_invite_team_member from "./en/pages/billing-invite-team-member-stacks.json";
import en_page_committees from "./en/pages/committees.json";
import en_ecosystems from "./en/pages/ecosystems";
import en_hackathons_details from "./en/pages/hackathons-details.json";
import en_hackathons from "./en/pages/hackathons.json";
import en_home from "./en/pages/home";
import en_project_applications_table from "./en/pages/project-applications/project-applications-table.json";
import en_project_details_application_details from "./en/pages/project-details/project-application-details.json";
import en_project_details_header from "./en/pages/project-details/project-header.json";
import en_project_overview from "./en/pages/project-overview.json";
import en_projects from "./en/pages/projects.json";
import en_public_profile from "./en/pages/public-profile.json";
import en_settings_billing from "./en/pages/settings-billing.json";
import en_settings_billing_coworkers from "./en/pages/settings-billing/settings-billing-coworkers.json";
import en_settings_billing_header from "./en/pages/settings-billing/settings-billing-header.json";
import en_settings_billing_information from "./en/pages/settings-billing/settings-billing-informations.json";
import en_settings_billing_payout from "./en/pages/settings-billing/settings-billing-payout.json";
import en_settings_billing_sidebar from "./en/pages/settings-billing/settings-billing-sidebar.json";
import en_settings_billing_tabs from "./en/pages/settings-billing/settings-billing-tabs.json";
import en_settings_invoices from "./en/pages/settings-invoices.json";
import en_settings_payout_preferences from "./en/pages/settings-payout-preferences.json";
import en_settings_payout from "./en/pages/settings-payout.json";
import en_settings_profile from "./en/pages/settings-profile.json";
import en_page_sponsor from "./en/pages/sponsor.json";
import en_stack_mandate from "./en/pages/stacks-mandate.json";
import en_stack_request_payments from "./en/pages/stacks-request-payments.json";
import en_stack_sponsor_project from "./en/pages/stacks-sponsor-project.json";

export const en = {
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
      dotStatus: en_features_dots_status,
      sidebar: en_features_sidebar,
      billingsProfile: en_features_billings_profile,
      verify: en_features_verify,
      menu: en_features_menu,
      table: en_features_table,
      roles: en_features_roles,
      currency: en_features_currency,
      activityGraph: en_features_activity_graph,
      profileCard: en_features_profile_card,
      detailsAccordion: en_features_details_accordion,
      githubPermissions: {
        publicRepoScope: en_features_public_repo_scope_permissions,
        readWriteIssue: en_features_read_write_issue_permissions,
      },
      projects: {
        applyIssueDrawer: en_features_projects_apply_issue_drawer,
      },
      hackathonCard: en_features_hackathon_card,
      projectSideOverview: en_features_project_side_overview,
    },
    pages: {
      projects: en_projects,
      project: {
        overview: en_project_overview,
        details: {
          header: en_project_details_header,
          applicationDetails: en_project_details_application_details,
        },
        applications: {
          table: en_project_applications_table,
        },
      },
      settings: {
        profile: en_settings_profile,
        billing: {
          ...en_settings_billing,
          header: en_settings_billing_header,
          tabs: en_settings_billing_tabs,
          sidebar: en_settings_billing_sidebar,
          payout: en_settings_billing_payout,
          information: en_settings_billing_information,
          coworkers: en_settings_billing_coworkers,
        },
        payout: en_settings_payout,
        invoices: en_settings_invoices,
        payoutPreferences: en_settings_payout_preferences,
      },
      hackathons: { ...en_hackathons, details: en_hackathons_details },
      stacks: {
        request_payments: en_stack_request_payments,
        mandate: en_stack_mandate,
        billingCreate: en_billing_create,
        billingInviteTeamMember: en_billing_invite_team_member,
        sponsorProject: en_stack_sponsor_project,
      },
      publicProfile: en_public_profile,
      sponsor: en_page_sponsor,
      committees: en_page_committees,
      ecosystems: en_ecosystems,
      home: en_home,
      applications: en_applications,
    },
  },
};
