console.log("Content script loaded successfully!");

// Create the "Connect with All" button and style it
const connectAllButton = document.createElement('button');
connectAllButton.textContent = 'Connect with All';
connectAllButton.style.position = 'fixed';
connectAllButton.style.top = '20px';  // Top-right corner
connectAllButton.style.right = '20px';
connectAllButton.style.padding = '10px';
connectAllButton.style.fontSize = '16px';
connectAllButton.style.zIndex = '9999';
connectAllButton.style.backgroundColor = '#0073b1';
connectAllButton.style.color = 'white';
connectAllButton.style.border = 'none';
connectAllButton.style.borderRadius = '5px';
connectAllButton.style.cursor = 'pointer';
connectAllButton.style.transition = 'background-color 0.3s';  // Smooth background color transition

// Add button to the page
document.body.appendChild(connectAllButton);

// Change button color to green on click
connectAllButton.addEventListener('click', () => {
  connectAllButton.style.backgroundColor = 'green'; // Change to green on click
  
  // Find LinkedIn "Connect" buttons
  let connectButtons = Array.from(document.querySelectorAll('button'))
    .filter(button => button.querySelector('span.artdeco-button__text')?.innerText.trim() === 'Connect');

  console.log(`Found ${connectButtons.length} profiles to connect with.`);

  if (connectButtons.length === 0) {
    alert('No profiles available to connect with.');
    return;
  }

  // Click the "Connect" buttons with a delay
  connectButtons.forEach((button, index) => {
    setTimeout(() => {
      button.click();
      console.log(`Sent connection request to profile ${index + 1}`);

      // Close any popups
      setTimeout(() => {
        const closePopupButton = document.querySelector('button[aria-label="Dismiss"]');
        if (closePopupButton) {
          closePopupButton.click();
          console.log('Closed popup for profile connection.');
        }
      }, 1000);
    }, index * (Math.random() * (3000 - 1000) + 1000)); // Random delay between 1-3 seconds
  });
});

// Monitor URL changes and hide/show the button based on specific URL
let currentURL = window.location.href;

setInterval(() => {
  if (window.location.href !== currentURL) {
    currentURL = window.location.href;
    if (currentURL.includes("linkedin.com/mynetwork/" || "https://www.linkedin.com/mynetwork/grow/")) {
      connectAllButton.style.display = 'block';  // Show button on target URLs
    } else {
      connectAllButton.style.display = 'none';  // Hide button on other URLs
    }
  }
}, 1000);
