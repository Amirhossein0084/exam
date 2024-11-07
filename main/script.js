document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const loader = document.querySelector('.loader');
  const backgroundMusic = document.getElementById('background-music');
  const muteButton = document.getElementById('mute-button');
  let isMuted = true; // Track mute state
  let hasStarted = false; // Track if music playback has started

  // Mute/Unmute button functionality with user interaction for starting playback
  muteButton.addEventListener('click', () => {
    if (!hasStarted) {
      // Start playback only on first user interaction
      backgroundMusic.play().then(() => {
        hasStarted = true; // Mark as started after successful play
        backgroundMusic.muted = false; // Unmute
        isMuted = false;
        muteButton.textContent = 'Mute';
      }).catch(error => {
        console.error("Failed to start audio playback:", error);
      });
    } else {
      // Toggle mute/unmute on subsequent clicks
      if (isMuted) {
        backgroundMusic.muted = false;
        muteButton.textContent = 'Mute';
      } else {
        backgroundMusic.muted = true;
        muteButton.textContent = 'Unmute';
      }
      isMuted = !isMuted;
    }
  });

  // Fade out loader on page load
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
  }, 500);

  // Background image change on hover for each menu item
  menuItems.forEach(item => {
    const imageUrl = item.getAttribute('data-image');
    item.style.setProperty('--item-image', `url(${imageUrl})`);

    // Change background on hover
    item.addEventListener('mouseover', () => {
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.transform = 'scale(1.02)';
      document.body.style.overflow = 'hidden'; // Disable scrolling on hover
    });

    // Reset background and allow scrolling on mouse leave
    item.addEventListener('mouseleave', () => {
      document.body.style.backgroundImage = 'url("default-bg.jpg")';
      document.body.style.transform = 'scale(1)';
      document.body.style.overflow = 'auto'; // Enable scrolling again
    });

    // Page navigation with loader
    item.addEventListener('click', () => {
      loader.style.opacity = '1';
      loader.style.visibility = 'visible';
      setTimeout(() => {
        window.location.href = item.getAttribute('data-link');
      }, 500); // Delay for fade-in effect
    });
  });
});
