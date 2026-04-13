import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  default_locale: "en",
  name: pkg.name,
  version: pkg.version,
  icons: {
    48: "public/logo.svg",
  },
  action: {
    default_icon: {
      48: "public/logo.svg",
    },
    default_popup: "src/popup/index.html",
  },
  content_scripts: [
    {
      js: ["src/content/main.ts"],
      matches: ["https://*/*"],
    },
  ],
  host_permissions: ["<all_urls>"],
  permissions: ["storage", "activeTab", "tabs", "unlimitedStorage"],
  options_page: "src/options/index.html",
});
