chrome.runtime.onInstalled.addListener(() => {
  console.log('Trade Manager Extension Installed');
});

chrome.notifications.create({
  type: 'basic',
  iconUrl: 'icons/icon.png',
  title: 'Trade Manager',
  message: 'Extension is running!',
});
