let seconds = 0;
let intervalId;
let activeTabURL = '';
let timeLimit = 10;
let blockedRules = [];
notBeenReloaded = true;
notPoppedUp = true;

chrome.storage.local.set({ timeLimit: timeLimit });

let socialDict = {
  'Instagram': 0,
  'Reddit': 0,
  'X': 0,
  'TikTok': 0,
  'Snapchat': 0,
  'Remaining Time': (timeLimit - seconds)
};

blockedRules = [
  {
    id: 1,
    priority: 1,
    action: {
      type: "block"
    },
    condition: {
      urlFilter: "*://*.instagram.com/*",
      resourceTypes: ["main_frame", "sub_frame"]
    }
  },
  {
    id: 2,
    priority: 1,
    action: {
      type: "block"
    },
    condition: {
      urlFilter: "*://*.reddit.com/*",
      resourceTypes: ["main_frame", "sub_frame"]
    }
  },
  {
    id: 3,
    priority: 1,
    action: {
      type: "block"
    },
    condition: {
      urlFilter: "*://x.com/*",
      resourceTypes: ["main_frame", "sub_frame"]
    }
  },
  {
    id: 4,
    priority: 1,
    action: {
      type: "block"
    },
    condition: {
      urlFilter: "*://*.tiktok.com/*",
      resourceTypes: ["main_frame", "sub_frame"]
    }
  },
  {
    id: 5,
    priority: 1,
    action: {
      type: "block"
    },
    condition: {
      urlFilter: "*://*.snapchat.com/*",
      resourceTypes: ["main_frame", "sub_frame"]
    }
  }
];

// Function to start incrementing time if the tab is a social media site
function startIncrementing(siteURL) {
  if (!intervalId) {
    intervalId = setInterval(() => {
      // Check if the current tab's URL is still a social media URL
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          const currentURL = tabs[0].url;
          let socialSite = '';

          // Check if the current tab is one of the social media sites
          if (currentURL.includes('instagram.com')) {
            socialSite = 'Instagram';
          } else if (currentURL.includes('reddit.com')) {
            socialSite = 'Reddit';
          } else if (currentURL.includes('x.com')) {
            socialSite = 'X';
          } else if (currentURL.includes('tiktok.com')) {
            socialSite = 'TikTok';
          } else if (currentURL.includes('snapchat.com')) {
            socialSite = 'Snapchat';
          }

          // If a social media site is detected, increment the time
          if (socialSite !== '') {
            seconds++; // Increment the seconds
            socialDict[socialSite]++;
            socialDict['Remaining Time'] = timeLimit - seconds;
            chrome.storage.local.set({ totalTime: seconds });
            chrome.storage.local.set({ socialDict: socialDict });

            if (seconds > timeLimit) {
              updateFilters();
            }
          }

          console.log(seconds);
          console.log(timeLimit);
          console.log(seconds >= timeLimit);

          if (seconds >= timeLimit) {
            // If the time limit is exceeded, block the websites
            updateFilters(true);  // Pass true to block websites
          } else {
            // If below time limit, unblock the websites
            updateFilters(false);  // Pass false to unblock websites
            console.log('goes to function');
          }
        }
      });
    }, 1000); // Increment every second
  }
}

// Listen for tab activation (when a user switches to a different tab)
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    activeTabURL = tab.url;
    console.log("Activated tab URL:", activeTabURL);
    startIncrementing(activeTabURL); // Start incrementing if needed
  });
});

// Listen for tab updates (e.g., when a user navigates to a new page)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    activeTabURL = tab.url;
    console.log("Updated tab URL:", activeTabURL);
    startIncrementing(activeTabURL); // Start incrementing if needed
  }
});

function blockRequest(details) {
  return { cancel: true }; // Cancel the request
}

function updateFilters(block) {
  if (block) {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: blockedRules,
      removeRuleIds: [1, 2, 3, 4, 5] // Remove old rules if necessary
    }, () => {
      reloadOnce();
      openPopupOnce();
    });
  } else {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1, 2, 3, 4, 5] // Remove the specific rules to unblock
    }, () => {
      console.log("Blocking rules removed.");
    });
  }
}

function reloadOnce() {
  if (notBeenReloaded) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.reload(tabs[0].id);
      }
    });
    notBeenReloaded = false;
  }
}

function openPopupOnce() {
  if (notPoppedUp) {
    chrome.windows.create({
      url: 'popup.html',
      type: 'popup',
      width: 400,
      height: 630
    });
    notPoppedUp = false;
  }

}
