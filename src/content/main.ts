const CONTENT_SCRIPT_FLAG = "data-cat-focus-content-script";

function bootstrapContentScript() {
  if (document.documentElement.hasAttribute(CONTENT_SCRIPT_FLAG)) {
    return;
  }

  document.documentElement.setAttribute(CONTENT_SCRIPT_FLAG, "true");
}

bootstrapContentScript();
