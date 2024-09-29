document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the socialDict from storage when the popup is loaded
    chrome.storage.local.get('socialDict', (result) => {
      const socialDict = result.socialDict;
    
    chrome.storage.local.get('timeLimit', (result) => {
      const timeLimit = result.timeLimit;

      if (socialDict) {
        const breakdown = document.getElementById('breakdown');
        breakdown.innerHTML = `
          <li>Instagram: ${socialDict['Instagram']} seconds (${Math.floor((socialDict['Instagram'] / timeLimit)*100)}% of total time)</li>
          <li>Reddit: ${socialDict['Reddit']} seconds (${Math.floor((socialDict['Reddit'] / timeLimit)*100)}% of total time)</li>
          <li>X: ${socialDict['X']} seconds (${Math.floor((socialDict['X'] / timeLimit)*100)}% of total time)</li>
          <li>TikTok: ${socialDict['TikTok']} seconds (${Math.floor((socialDict['TikTok'] / timeLimit)*100)}% of total time)</li>
          <li>Snapchat: ${socialDict['Snapchat']} seconds (${Math.floor((socialDict['Snapchat'] / timeLimit)*100)}% of total time)</li>
        `;
      } else {
        console.log('No socialDict found in storage.');
      }
    });
  })
})