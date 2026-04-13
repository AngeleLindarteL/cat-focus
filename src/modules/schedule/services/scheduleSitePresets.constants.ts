import amazonIcon from "@/assets/icons/popular-sites/amazon.svg";
import facebookIcon from "@/assets/icons/popular-sites/facebook.svg";
import instagramIcon from "@/assets/icons/popular-sites/instagram.svg";
import netflixIcon from "@/assets/icons/popular-sites/netflix.svg";
import redditIcon from "@/assets/icons/popular-sites/reddit.svg";
import tiktokIcon from "@/assets/icons/popular-sites/tiktok.svg";
import xIcon from "@/assets/icons/popular-sites/x.svg";
import youtubeIcon from "@/assets/icons/popular-sites/youtube.svg";
import type { ScheduleSitePreset } from "@/modules/schedule/services/scheduleSitePresets.interfaces";

export const POPULAR_SCHEDULE_SITE_PRESETS: ScheduleSitePreset[] = [
  { id: "instagram", name: "Instagram", domain: "instagram.com", iconSrc: instagramIcon },
  { id: "facebook", name: "Facebook", domain: "facebook.com", iconSrc: facebookIcon },
  { id: "reddit", name: "Reddit", domain: "reddit.com", iconSrc: redditIcon },
  { id: "x", name: "X", domain: "x.com", iconSrc: xIcon },
  { id: "amazon", name: "Amazon", domain: "amazon.com", iconSrc: amazonIcon },
  { id: "youtube", name: "YouTube", domain: "youtube.com", iconSrc: youtubeIcon },
  { id: "tiktok", name: "TikTok", domain: "tiktok.com", iconSrc: tiktokIcon },
  { id: "netflix", name: "Netflix", domain: "netflix.com", iconSrc: netflixIcon },
];
