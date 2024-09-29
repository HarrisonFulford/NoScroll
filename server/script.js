// script.js

// Sample data to populate the stats
const socialMedia = "Instagram";
const timeLimit = 3; // in hours
const percentage = ((timeLimit / 15) * 100).toFixed(2); // Example calculation for percentage
const lifetimeEarnings = (timeLimit * 20 * 365 * 50).toLocaleString(); // Example calculation for earnings

// Populate the HTML elements
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".highlight").textContent = socialMedia; // Social media name
    document.querySelectorAll(".highlight")[1].textContent = timeLimit; // Time limit
    document.querySelectorAll(".highlight")[2].textContent = percentage; // Percentage of waking hours
    document.querySelectorAll(".highlight")[3].textContent = percentage; // Percentage of 80 years

    // Add earnings information correctly
    const comingSoonContainer = document.querySelector(".comingSoonContainer");
    comingSoonContainer.innerHTML += `<p>${earningsMessage}</p>`; // Append earnings message
});
