// script.js

let socialDict = {
    'Instagram': 3, 
    'Reddit': 1, 
    'X': 1, 
    'TikTok': 4, 
    'Snapchat': 1
};



let highest = Object.entries(socialDict).reduce((acc, [key, value]) => {
    return value > acc.value ? { key, value } : acc;
}, { key: null, value: -Infinity });

let totalSum = Object.values(socialDict).reduce((acc, value) => acc + value, 0);

// Sample data to populate the stats
const socialMedia = highest.key;
const timeLimit = Math.round(totalSum); // in hours
const percentage = ((totalSum / 15) * 100).toFixed(2); // Example calculation for percentage
const years = Math.round((80*(totalSum / 24)))
const lifetimeEarnings = Math.round((totalSum * 20 * 365 * 50)).toLocaleString(); // Example calculation for earnings

// Populate the HTML elements
document.addEventListener("DOMContentLoaded", () => {

    // Extract labels and data from the dictionary
    const labels = Object.keys(socialDict);
    const dataValues = Object.values(socialDict);

    // Create the pie chart
    const ctx = document.getElementById('myPieChart').getContext('2d');
    const myPieChart = new Chart(ctx, {
        type: 'pie', // Specify the chart type
        data: {
            labels: labels, // Use the extracted labels
            datasets: [{
                label: 'Time Spent (Hours)',
                data: dataValues, // Use the extracted values
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: false,
                }
            }
        }
    });

    document.querySelector(".highlight").textContent = socialMedia; // Social media name
    document.querySelectorAll(".highlight")[1].textContent = timeLimit; // Time limit
    document.querySelectorAll(".highlight")[2].textContent = percentage; // Percentage of waking hours
    document.querySelectorAll(".highlight")[3].textContent = years; // Number of years on social media
    document.querySelectorAll(".highlight")[4].textContent = lifetimeEarnings; //Money given up by being on social media

    // Add earnings information correctly
    const comingSoonContainer = document.querySelector(".comingSoonContainer");
    comingSoonContainer.innerHTML += `<p>${earningsMessage}</p>`; // Append earnings message
});
