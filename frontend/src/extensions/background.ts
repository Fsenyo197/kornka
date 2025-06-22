chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'capture_tabs') {
    chrome.tabs.query({}, (tabs) => {
      const formattedTabs = tabs.map((tab) => ({
        id: tab.id!,
        title: tab.title || 'Untitled',
        url: tab.url || 'Unknown',
      }));

      // Store available tabs
      chrome.storage.local.set({ availableTabs: formattedTabs }, () => {
        sendResponse({ success: true, tabs: formattedTabs });
      });
    });
    return true;
  }

  if (message.action === 'group_tabs' && message.tabIds?.length > 0) {
    chrome.tabs.group({ tabIds: message.tabIds }).then((groupId) => {
      chrome.tabGroups.update(groupId, {
        title: 'Selected Tabs',
        color: 'green',
      });
      sendResponse({ success: true });
    });
    return true;
  }

  if (message.action === 'select_tabs') {
    // Store selected tab IDs
    chrome.storage.local.set({ selectedTabs: message.tabIds }, () => {
      sendResponse({ success: true });
    });
    return true;
  }

  if (message.action === 'get_selected_tabs') {
    // Retrieve selected tabs
    chrome.storage.local.get('selectedTabs', (data) => {
      sendResponse({ success: true, selectedTabs: data.selectedTabs || [] });
    });
    return true;
  }

  if (message.action === 'execute_trade') {
    // Retrieve selected tabs from storage
    chrome.storage.local.get('selectedTabs', (data) => {
      const selectedTabs = data.selectedTabs || [];

      // Broadcast the trade action only to selected tabs
      selectedTabs.forEach((tabId: number) => {
        if (tabId !== sender.tab?.id) {
          chrome.tabs.sendMessage(tabId, message);
        }
      });

      sendResponse({ success: true });
    });
    return true;
  }
});
