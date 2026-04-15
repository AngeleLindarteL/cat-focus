function getManagementApi(): typeof chrome.management | null {
  if (typeof chrome === "undefined" || !chrome.management?.getSelf) {
    return null;
  }

  return chrome.management;
}

export async function getExtensionInstallType(): Promise<
  chrome.management.ExtensionInfo["installType"] | null
> {
  const managementApi = getManagementApi();

  if (!managementApi) {
    return null;
  }

  const extensionInfo = await managementApi.getSelf();

  return extensionInfo.installType ?? null;
}

export async function isDevelopmentInstall(): Promise<boolean> {
  const installType = await getExtensionInstallType();

  return installType === "development";
}
