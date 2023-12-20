import addContribution from "src/assets/img/add-contribution.webp";
import alertBg from "src/assets/img/alert-bg.webp";
import atom from "src/assets/img/atom.webp";
import axeCoin from "src/assets/img/axe-coin.webp";
import bgSpace from "src/assets/img/bg-space.webp";
import categories from "src/assets/img/categories.webp";
import circle from "src/assets/img/circle.webp";
import compass from "src/assets/img/compass.webp";
import contributionsBg from "src/assets/img/contributions-bg.webp";
import dustBtmLeft from "src/assets/img/dust-btm-left.webp";
import dustTopRight from "src/assets/img/dust-top-right.webp";
import emptyState from "src/assets/img/empty-state.webp";
import githubTutorialStep2 from "src/assets/img/github_tutorial_step_2.webp";
import githubTutorialStep3Gif from "src/assets/img/github_tutorial_step_3.gif";
import githubLogo from "src/assets/img/github-logo.svg";
import grainBackground from "src/assets/img/grain-background.webp";
import headerElementBackground from "src/assets/img/header-element-background.webp";
import lords from "src/assets/img/lords.webp";
import mosaic from "src/assets/img/mosaic.webp";
import noiseHeavy from "src/assets/img/noise-heavy.webp";
import noiseLight from "src/assets/img/noise-light.webp";
import noiseMedium from "src/assets/img/noise-medium.webp";
import notFound from "src/assets/img/not-found.webp";
import onlydustLogoSpace from "src/assets/img/onlydust-logo-space.webp";
import onlydustLogoWhite from "src/assets/img/onlydust-logo-white.svg";
import onlydustLogo from "src/assets/img/onlydust-logo.webp";
import onlydustTitle from "src/assets/img/onlydust-title.svg";
import payment from "src/assets/img/payment.webp";
import payoutInformationMissingBannerBackground from "src/assets/img/payout-information-missing-banner-background.svg";
import pickContributor from "src/assets/img/pick-contributor.webp";
import publicProfileBg from "src/assets/img/public-profile-bg.webp";
import spaceCardBg from "src/assets/img/space-card-bg.webp";
import stripePattern from "src/assets/img/stripe-pattern.svg";
import technology from "src/assets/img/technology.svg";
import telegramLogo from "src/assets/img/telegram-logo.svg";
import thumbnail from "src/assets/img/thumbnail.webp";
import totalEarningsBackground from "src/assets/img/total-earnings-background.webp";
import underline from "src/assets/img/underline.webp";
import userProfileBgBlue from "src/assets/img/user-profile-bg-blue.webp";
import userProfileBgCyan from "src/assets/img/user-profile-bg-cyan.webp";
import userProfileBgMagenta from "src/assets/img/user-profile-bg-magenta.webp";
import userProfileBgYellow from "src/assets/img/user-profile-bg-yellow.webp";

export const IMAGES = {
  logo: {
    original: onlydustLogo.src,
    space: onlydustLogoSpace.src,
  },
  icons: {
    compass: compass.src,
    circle: circle.src,
    axeCoin: axeCoin.src,
    atom: atom.src,
    emptyState: emptyState.src,
    lords: lords.src,
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
