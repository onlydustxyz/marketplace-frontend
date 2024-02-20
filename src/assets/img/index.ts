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
import githubLogo from "./github-logo.svg";
import githubTutorialStep2 from "./github_tutorial_step_2.webp";
import githubTutorialStep3Gif from "./github_tutorial_step_3.gif";
import grainBackground from "./grain-background.webp";
import headerElementBackground from "./header-element-background.webp";
import lords from "./lords.webp";
import mosaic from "./mosaic.webp";
import noiseHeavy from "./noise-heavy.webp";
import noiseLight from "./noise-light.webp";
import noiseMedium from "./noise-medium.webp";
import notFound from "./not-found.webp";
import onlydustLogoCrashed from "./onlydust-logo-crashed.svg";
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
import usdc from "./usdc.webp";
import userProfileBgBlue from "./user-profile-bg-blue.webp";
import userProfileBgCyan from "./user-profile-bg-cyan.webp";
import userProfileBgMagenta from "./user-profile-bg-magenta.webp";
import userProfileBgYellow from "./user-profile-bg-yellow.webp";

export const IMAGES = {
  logo: {
    original: onlydustLogo.src,
    space: onlydustLogoSpace.src,
    crashed: onlydustLogoCrashed.src,
  },
  icons: {
    compass: compass.src,
    circle: circle.src,
    axeCoin: axeCoin.src,
    atom: atom.src,
    emptyState: emptyState.src,
    lords: lords.src,
    usdc: usdc.src,
  },
  background: {
    user: {
      blue: userProfileBgBlue.src,
      cyan: userProfileBgCyan.src,
      magenta: userProfileBgMagenta.src,
      yellow: userProfileBgYellow.src,
    },
    dust: {
      btmLeft: dustBtmLeft.src,
      topRight: dustTopRight.src,
    },
    spaceCard: spaceCardBg.src,
    publicProfile: publicProfileBg.src,
    contributions: contributionsBg.src,
    alert: alertBg.src,
    space: bgSpace.src,
    grain: grainBackground.src,
    headerElement: headerElementBackground.src,
    totalEarnings: totalEarningsBackground.src,
  },
  github: {
    tutorial: {
      step2: githubTutorialStep2.src,
      step3: githubTutorialStep3Gif.src,
    },
  },
  noise: {
    light: noiseLight.src,
    medium: noiseMedium.src,
    heavy: noiseHeavy.src,
  },
  global: {
    categories: categories.src,
    underline: underline.src,
    payment: payment.src,
    pickContributor: pickContributor.src,
    thumbnail: thumbnail.src,
    mosaic: mosaic.src,
    notFound: notFound.src,
    addContribution: addContribution.src,
  },
  svg: {
    logos: {
      github: githubLogo.src,
      telegram: telegramLogo.src,
    },
    onlydust: {
      logoWhite: onlydustLogoWhite.src,
      title: onlydustTitle.src,
    },
    background: {
      payoutInformationMissingBanner: payoutInformationMissingBannerBackground.src,
    },
    technology: technology.src,
    stripePattern: stripePattern.src,
  },
};
