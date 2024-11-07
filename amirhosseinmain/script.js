document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const loader = document.querySelector('.loader');
    const backgroundMusic = document.getElementById('background-music');
    const muteButton = document.getElementById('mute-button');
    let isMuted = true;
    let hasStarted = false;

    // Mute/Unmute music
    muteButton.addEventListener('click', () => {
        if (!hasStarted) {
            backgroundMusic.play().then(() => {
                hasStarted = true;
                backgroundMusic.muted = false;
                isMuted = false;
                muteButton.textContent = 'Mute';
            }).catch(error => console.error("Audio playback error:", error));
        } else {
            backgroundMusic.muted = !backgroundMusic.muted;
            muteButton.textContent = backgroundMusic.muted ? 'Unmute' : 'Mute';
        }
    });

    // Hide loader after a delay
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 500);

    // Prevent horizontal scroll function
    const preventHorizontalScroll = (event) => {
        if (event.deltaX !== 0) {
            event.preventDefault(); // Prevent horizontal scroll
        }
    };

    // Add event listeners to menu items
    menuItems.forEach(item => {
        const imageUrl = item.getAttribute('data-image');
        item.style.backgroundImage = `url(${imageUrl})`; // Apply background image

        item.addEventListener('mouseenter', () => {
            // Change body background
            document.body.style.backgroundImage = `url(${imageUrl})`;

            // Disable horizontal scroll if viewport width is <= 1200px
            if (window.innerWidth <= 1200) {
                window.addEventListener('wheel', preventHorizontalScroll, { passive: false });
            }
        });

        item.addEventListener('mouseleave', () => {
            // Reset background image
            document.body.style.backgroundImage = 'url("default-bg.jpg")';

            // Remove horizontal scroll prevention
            if (window.innerWidth <= 1200) {
                window.removeEventListener('wheel', preventHorizontalScroll);
            }
        });

        item.addEventListener('click', () => {
            loader.style.opacity = '1';
            loader.style.visibility = 'visible';
            setTimeout(() => {
                window.location.href = item.getAttribute('data-link');
            }, 500);
        });
    });
});
