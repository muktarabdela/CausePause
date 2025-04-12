let pauseOverlay;

function injectPauseUI() {
  if (document.getElementById('causePauseOverlay')) {
    return;
  }

  pauseOverlay = document.createElement('iframe');
  pauseOverlay.src = chrome.runtime.getURL('pause.html');
  pauseOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        border: none;
  `;
  pauseOverlay.id = 'causePauseOverlay';
  document.body.appendChild(pauseOverlay);
  document.documentElement.style.overflow = 'hidden'; // Prevent scrolling
}

function removePauseUI() {
  if (pauseOverlay) {
    pauseOverlay.remove();
    document.documentElement.style.overflow = 'auto'; // Re-enable scrolling
    pauseOverlay = null;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'youtubeDetected') {
    injectPauseUI();
  } else if (message.action === 'unblockYouTube') {
    removePauseUI();
  }
});

