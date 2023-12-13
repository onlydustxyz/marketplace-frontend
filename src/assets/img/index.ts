import addContribution from "./add-contribution.webp";
import alertBg from "./alert-bg.webp";
import atom from "./atom.webp";
import axeCoin from "./axe-coin.webp";
import bgSpace from "./bg-space.webp";
import categories from "./categories.webp";
import circle from "./circle.webp";
import compass from "./compass.webp";
import contributionsBg from "./contributions-bg.webp";
import dustBtmLeft from "./dust-btm-left.webp";
import dustTopRight from "./dust-top-right.webp";
import emptyState from "./empty-state.webp";
import githubTutorialStep2 from "./github_tutorial_step_2.webp";
import githubTutorialStep3Gif from "./github_tutorial_step_3.gif";
import githubLogo from "./github-logo.svg";
import grainBackground from "./grain-background.webp";
import headerElementBackground from "./header-element-background.webp";
import lords from "./lords.webp";
import mosaic from "./mosaic.webp";
import noiseHeavy from "./noise-heavy.webp";
import noiseLight from "./noise-light.webp";
import noiseMedium from "./noise-medium.webp";
import notFound from "./not-found.webp";
import onlydustLogoSpace from "./onlydust-logo-space.webp";
import onlydustLogoWhite from "./onlydust-logo-white.svg";
import onlydustLogo from "./onlydust-logo.webp";
import onlydustTitle from "./onlydust-title.svg";
import payment from "./payment.webp";
import payoutInformationMissingBannerBackground from "./payout-information-missing-banner-background.svg";
import pickContributor from "./pick-contributor.webp";
import publicProfileBg from "./public-profile-bg.webp";
import spaceCardBg from "./space-card-bg.webp";
import stripePattern from "./stripe-pattern.svg";
import technology from "./technology.svg";
import telegramLogo from "./telegram-logo.svg";
import thumbnail from "./thumbnail.webp";
import totalEarningsBackground from "./total-earnings-background.webp";
import underline from "./underline.webp";
import userProfileBgBlue from "./user-profile-bg-blue.webp";
import userProfileBgCyan from "./user-profile-bg-cyan.webp";
import userProfileBgMagenta from "./user-profile-bg-magenta.webp";
import userProfileBgYellow from "./user-profile-bg-yellow.webp";

export const IMAGES = {
  logo: {
    original: onlydustLogo,
    space: onlydustLogoSpace,
  },
  icons: {
    compass,
    circle,
    axeCoin,
    atom,
    emptyState,
    lords,
  },
  background: {
    user: {
      blue: userProfileBgBlue,
      cyan: userProfileBgCyan,
      magenta: userProfileBgMagenta,
      yellow: userProfileBgYellow,
    },
    dust: {
      btmLeft: dustBtmLeft,
      topRight: dustTopRight,
    },
    spaceCard: spaceCardBg,
    publicProfile: publicProfileBg,
    contributions: contributionsBg,
    alert: alertBg,
    space: bgSpace,
    grain: grainBackground,
    headerElement: headerElementBackground,
    totalEarnings: totalEarningsBackground,
  },
  github: {
    tutorial: {
      step2: githubTutorialStep2,
      step3: githubTutorialStep3Gif,
    },
  },
  noise: {
    light: noiseLight,
    medium: noiseMedium,
    heavy: noiseHeavy,
  },
  global: {
    categories,
    underline,
    payment,
    pickContributor,
    thumbnail,
    mosaic,
    notFound,
    addContribution,
  },
  svg: {
    logos: {
      github: githubLogo,
      telegram: telegramLogo,
    },
    onlydust: {
      logoWhite: onlydustLogoWhite,
      title: onlydustTitle,
    },
    background: {
      payoutInformationMissingBanner: payoutInformationMissingBannerBackground,
    },
    technology,
    stripePattern,
  },
};
