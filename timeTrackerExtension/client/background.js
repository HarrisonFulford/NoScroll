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
  // Same blocked rules for social media sites
  // ...
];

// Function to start incrementing time if the tab is a social media site
function startIncrementing(siteURL) {
  if (!intervalId) {
    intervalId = setInterval(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          const currentURL = tabs[0].url;
          let socialSite = '';

          // Check if the current tab is a social media site
          if (currentURL.includes('instagram.com')) socialSite = 'Instagram';
          else if (currentURL.includes('reddit.com')) socialSite = 'Reddit';
          else if (currentURL.includes('x.com')) socialSite = 'X';
          else if (currentURL.includes('tiktok.com')) socialSite = 'TikTok';
          else if (currentURL.includes('snapchat.com')) socialSite = 'Snapchat';

          // Increment the time if it's a social media site
          if (socialSite !== '') {
            seconds++; // Increment seconds
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
            // Block the websites and send data to MongoDB
            updateFilters(true);  // Pass true to block websites
            sendDataToMongoDB(socialDict);  // Send the data
          } else {
            updateFilters(false);  // Unblock websites if below time limit
            console.log('goes to function');
          }
        }
      });
    }, 1000); // Increment every second
  }
}

// Function to send data to MongoDB
function sendDataToMongoDB(socialData) {
  // Send the socialDict data to the backend API
  fetch('http://localhost:3001/addScreenTime', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(socialData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Data successfully sent to MongoDB:', data);
  })
  .catch(error => {
    console.error('Error sending data to MongoDB:', error);
  });
}

// Listen for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    activeTabURL = tab.url;
    console.log("Activated tab URL:", activeTabURL);
    startIncrementing(activeTabURL);
  });
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    activeTabURL = tab.url;
    console.log("Updated tab URL:", activeTabURL);
    startIncrementing(activeTabURL);
  }
});

function updateFilters(block) {
  if (block) {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: blockedRules,
      removeRuleIds: [1, 2, 3, 4, 5]
    }, () => {
      reloadOnce();
      openPopupOnce();
    });
  } else {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1, 2, 3, 4, 5]
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