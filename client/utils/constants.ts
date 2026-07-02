import {
  ContentLinkPlatformEnum,
  PageStatusEnum,
  SwapStatusEnum,
} from "~/types/enums";

export const CONTENT_LINKS_LIST = [
  ContentLinkPlatformEnum.X,
  ContentLinkPlatformEnum.NOSTR,
  ContentLinkPlatformEnum.PODCAST_RSS,
  ContentLinkPlatformEnum.SUBSTACK,
  ContentLinkPlatformEnum.TELEGRAM,
  ContentLinkPlatformEnum.INSTAGRAM,
  ContentLinkPlatformEnum.WEBSITE,
  ContentLinkPlatformEnum.YOUTUBE,
  ContentLinkPlatformEnum.RUMBLE,
  ContentLinkPlatformEnum.TWITCH,
  ContentLinkPlatformEnum.TIKTOK,
  ContentLinkPlatformEnum.ODYSEE,
  ContentLinkPlatformEnum.XMRBAZAAR,
  ContentLinkPlatformEnum.KICK,
  ContentLinkPlatformEnum.KUNO,
  ContentLinkPlatformEnum.PEERTUBE,
  ContentLinkPlatformEnum.UPSCROLLED,
  ContentLinkPlatformEnum.BITCHUTE,
  ContentLinkPlatformEnum.DISCORD,
  ContentLinkPlatformEnum.PATREON,
  ContentLinkPlatformEnum.SUBSCRIBESTAR,
  ContentLinkPlatformEnum.GITHUB,
  ContentLinkPlatformEnum.MONERO_JOBS,
  ContentLinkPlatformEnum.FACEBOOK,
];

export const SWAP_STATUSES = {
  [SwapStatusEnum.CONFIRMING]: {
    label: "Confirming",
    color: "green",
  },
  [SwapStatusEnum.WAITING]: {
    label: "Waiting",
    color: "orange",
  },
  [SwapStatusEnum.SENDING]: {
    label: "Sending",
    color: "green",
  },
  [SwapStatusEnum.FINISHED]: {
    label: "Finished",
    color: "green",
  },
  [SwapStatusEnum.EXPIRED]: {
    label: "Expired",
    color: "red",
  },
  [SwapStatusEnum.FAILED]: {
    label: "Failed",
    color: "red",
  },
};

export const PAGE_STATUS = {
  [PageStatusEnum.ACTIVE]: { title: "Active", subjectTitle: "Activated" },
  [PageStatusEnum.DEACTIVE]: { title: "Deactive", subjectTitle: "Deactivated" },
};

export const PAGE_TIER_COLORS: Record<
  string,
  { color: string; headerColor: string }
> = {
  "rgb(21,101,192)": {
    color: "rgb(21,101,192)",
    headerColor: "rgb(17,83,157)",
  },
  "rgb(0,229,255)": {
    color: "rgb(0,229,255)",
    headerColor: "rgb(0,184,212)",
  },
  "rgb(15,157,88)": {
    color: "rgb(15,157,88)",
    headerColor: "rgb(10,128,67)",
  },
  "rgb(255,202,40)": {
    color: "rgb(255,202,40)",
    headerColor: "rgb(255,179,0)",
  },
  "rgb(245,124,0)": {
    color: "rgb(245,124,0)",
    headerColor: "rgb(230,81,0)",
  },
  "rgb(233,30,99)": {
    color: "rgb(233,30,99)",
    headerColor: "rgb(194,24,91)",
  },
  "rgb(230,33,23)": {
    color: "rgb(230,33,23)",
    headerColor: "rgb(208,0,0)",
  },
};
