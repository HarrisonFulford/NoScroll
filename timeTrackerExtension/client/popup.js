document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['totalTime', 'site'], function(result) {
        document.getElementById('seconds').innerText = result.totalTime || 0;
        document.getElementById('socialSite').innerText = result.site || 'N/A';
    });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const activeTab = tabs[0];
            document.getElementById('tab-url').innerText = activeTab.url;
        }
    });
});
  