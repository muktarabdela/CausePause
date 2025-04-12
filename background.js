chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('www.youtube.com')) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: () => {
        // Send message to content script
        chrome.runtime.sendMessage({ action: 'youtubeDetected' });
      }
    });
  }
});

