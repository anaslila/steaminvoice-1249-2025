// Steam Purchase Confirmation - Script.js

// Global variables
let isLoading = false;
let installProgress = 0;

// DOM Elements
const installButton = document.querySelector('.btn-primary');
const continueShoppingButton = document.querySelector('.btn-secondary');
const orderIdElement = document.querySelector('.order-id');
const transactionIdElement = document.querySelector('.transaction-id');
const cardNumberElement = document.querySelector('.card-number');
const gameImage = document.querySelector('.game-image img');
const navLinks = document.querySelectorAll('.nav-link');
const installSteamButton = document.querySelector('.install-steam');
const userInfo = document.querySelector('.user-info');
const notificationIcon = document.querySelector('.notification-icon');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    attachEventListeners();
    addAnimations();
    simulateRealTimeEffects();
});

// Initialize page functionality
function initializePage() {
    // Add subtle loading effect to success banner
    setTimeout(() => {
        document.querySelector('.success-banner').classList.add('loaded');
    }, 500);

    // Preload game image with fallback
    preloadGameImage();

    // Initialize clipboard functionality for order ID and transaction ID
    makeElementsClickable();

    // Create install status indicator
    createInstallStatusIndicator();

    // Initialize header interactions
    initializeHeaderInteractions();

    // Add Steam-like tooltips
    addSteamTooltips();
}

// Preload game image with error handling
function preloadGameImage() {
    const img = new Image();
    img.onload = function() {
        gameImage.src = this.src;
        gameImage.classList.add('loaded');
    };
    img.onerror = function() {
        gameImage.src = 'https://via.placeholder.com/460x215/2a475e/c7d5e0?text=GTA+V+Enhanced';
        gameImage.alt = 'Grand Theft Auto V Enhanced - Image unavailable';
    };
    img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxK6DxUQRxleK6FiuqoOQ5HJCFVP3ZaaRExm0IGUZCPxYityjGmWnwcRb2Kv5TuAvGh7s&usqp=CAU';
}

// Make clickable elements for copying
function makeElementsClickable() {
    // Order ID click to copy
    if (orderIdElement) {
        orderIdElement.style.cursor = 'pointer';
        orderIdElement.title = 'Click to copy Order ID';
        orderIdElement.addEventListener('click', function() {
            copyToClipboard(this.textContent);
            showTooltip(this, 'Order ID copied!');
        });
    }

    // Transaction ID click to copy
    if (transactionIdElement) {
        transactionIdElement.style.cursor = 'pointer';
        transactionIdElement.title = 'Click to copy Transaction ID';
        transactionIdElement.addEventListener('click', function() {
            copyToClipboard(this.textContent);
            showTooltip(this, 'Transaction ID copied!');
        });
    }

    // Card Number click to copy (last 4 digits only for security)
    if (cardNumberElement) {
        cardNumberElement.style.cursor = 'pointer';
        cardNumberElement.title = 'Click to copy card reference';
        cardNumberElement.addEventListener('click', function() {
            copyToClipboard('Card ending in 2562');
            showTooltip(this, 'Card reference copied!');
        });
    }
}

// Initialize header interactions
function initializeHeaderInteractions() {
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show navigation feedback
            showNotification(`Navigating to ${this.textContent}...`, 'info');
            
            // Simulate page transition
            simulatePageTransition();
        });
    });

    // Install Steam button
    if (installSteamButton) {
        installSteamButton.addEventListener('click', function() {
            showNotification('Redirecting to Steam installer...', 'info');
            simulatePageTransition();
        });
    }

    // User dropdown
    if (userInfo) {
        userInfo.addEventListener('click', function() {
            showUserDropdown();
        });
    }

    // Notification icon
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            showNotifications();
        });
    }
}

// Show user dropdown menu
function showUserDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'user-dropdown';
    dropdown.innerHTML = `
        <div class="dropdown-content">
            <div class="dropdown-header">
                <div class="user-avatar">A</div>
                <div class="user-details">
                    <div class="user-name">Anas</div>
                    <div class="user-status">Online</div>
                </div>
            </div>
            <div class="dropdown-menu">
                <a href="#" class="dropdown-item">View Profile</a>
                <a href="#" class="dropdown-item">Account Details</a>
                <a href="#" class="dropdown-item">Store Preferences</a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item">Change Language</a>
                <a href="#" class="dropdown-item">Logout</a>
            </div>
        </div>
    `;

    // Position dropdown
    const rect = userInfo.getBoundingClientRect();
    dropdown.style.position = 'absolute';
    dropdown.style.top = rect.bottom + 'px';
    dropdown.style.right = '30px';
    dropdown.style.zIndex = '1000';

    document.body.appendChild(dropdown);

    // Close dropdown when clicking outside
    const closeDropdown = (e) => {
        if (!dropdown.contains(e.target) && !userInfo.contains(e.target)) {
            dropdown.remove();
            document.removeEventListener('click', closeDropdown);
        }
    };
    setTimeout(() => document.addEventListener('click', closeDropdown), 100);

    // Handle dropdown item clicks
    dropdown.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification(`${this.textContent} - Feature not available`, 'warning');
            dropdown.remove();
        });
    });
}

// Show notifications popup
function showNotifications() {
    const popup = document.createElement('div');
    popup.className = 'notifications-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-header">
                <h3>Notifications</h3>
                <span class="popup-close">&times;</span>
            </div>
            <div class="popup-body">
                <div class="notification-item">
                    <div class="notif-icon success"></div>
                    <div class="notif-content">
                        <div class="notif-title">Purchase Confirmed</div>
                        <div class="notif-time">Just now</div>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notif-icon info"></div>
                    <div class="notif-content">
                        <div class="notif-title">Game added to library</div>
                        <div class="notif-time">2 minutes ago</div>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notif-icon promo"></div>
                    <div class="notif-content">
                        <div class="notif-title">Summer Sale starts tomorrow!</div>
                        <div class="notif-time">1 hour ago</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    // Close popup
    const closePopup = () => popup.remove();
    popup.querySelector('.popup-close').addEventListener('click', closePopup);

    // Auto close after 5 seconds
    setTimeout(closePopup, 5000);
}

// Copy text to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Show temporary tooltip
function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.className = 'temp-tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: #4c8c2a;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        pointer-events: none;
        transform: translateX(-50%);
        white-space: nowrap;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.top - 40 + 'px';
    
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.remove();
        }
    }, 2000);
}

// Attach event listeners
function attachEventListeners() {
    // Install Game Button
    if (installButton) {
        installButton.addEventListener('click', handleInstallGame);
    }

    // Continue Shopping Button
    if (continueShoppingButton) {
        continueShoppingButton.addEventListener('click', handleContinueShopping);
    }

    // Game image click for enlarged view
    if (gameImage) {
        gameImage.addEventListener('click', showImageModal);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Window resize handler for responsive adjustments
    window.addEventListener('resize', handleResize);

    // Add print functionality
    addPrintFunctionality();

    // Add Steam-like hover effects
    addHoverEffects();
}

// Handle install game click
function handleInstallGame() {
    if (isLoading) return;

    isLoading = true;
    installButton.disabled = true;
    installButton.innerHTML = '<span class="loading-spinner"></span>Launching Steam...';

    // Add loading spinner styles
    addLoadingSpinnerStyles();

    // Simulate Steam launching process
    setTimeout(() => {
        showInstallProgress();
    }, 2000);

    // Reset after animation
    setTimeout(() => {
        resetInstallButton();
    }, 8000);
}

// Show install progress simulation
function showInstallProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'install-progress';
    progressContainer.innerHTML = `
        <div class="progress-header">
            <span>Grand Theft Auto V Enhanced</span>
            <span class="progress-status">Preparing...</span>
        </div>
        <div class="progress-bar-container">
            <div class="progress-bar"></div>
        </div>
        <div class="progress-info">
            <span class="progress-speed">Download speed: 0 MB/s</span>
            <span class="progress-eta">ETA: Calculating...</span>
        </div>
    `;

    // Insert after game section
    const gameSection = document.querySelector('.game-section');
    gameSection.parentNode.insertBefore(progressContainer, gameSection.nextSibling);

    // Animate progress
    animateInstallProgress();
}

// Animate install progress
function animateInstallProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const progressStatus = document.querySelector('.progress-status');
    const progressSpeed = document.querySelector('.progress-speed');
    const progressEta = document.querySelector('.progress-eta');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;

        if (progressBar) {
            progressBar.style.width = progress + '%';
        }

        if (progress < 30) {
            progressStatus.textContent = 'Downloading...';
            progressSpeed.textContent = `Download speed: ${(Math.random() * 50 + 10).toFixed(1)} MB/s`;
            progressEta.textContent = `ETA: ${Math.ceil((100 - progress) / 10)} minutes`;
        } else if (progress < 90) {
            progressStatus.textContent = 'Installing...';
            progressSpeed.textContent = 'Processing game files...';
            progressEta.textContent = `ETA: ${Math.ceil((100 - progress) / 20)} minutes`;
        } else {
            progressStatus.textContent = 'Ready to play!';
            progressSpeed.textContent = 'Installation complete';
            progressEta.textContent = 'Launch game from your library';
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                const progressContainer = document.querySelector('.install-progress');
                if (progressContainer) {
                    progressContainer.style.opacity = '0';
                    setTimeout(() => progressContainer.remove(), 500);
                }
            }, 2000);
        }
    }, 300);
}

// Reset install button
function resetInstallButton() {
    isLoading = false;
    installButton.disabled = false;
    installButton.innerHTML = 'Launch Game';
    installButton.classList.add('launch-ready');
}

// Handle continue shopping
function handleContinueShopping() {
    showNotification('Redirecting to Steam Store...', 'info');
    simulatePageTransition();
}

// Simulate page transition
function simulatePageTransition() {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0.7';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 1500);
}

// Show image modal
function showImageModal() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img src="${gameImage.src}" alt="${gameImage.alt}">
                <div class="modal-caption">Grand Theft Auto V Enhanced - Game Cover</div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close modal events
    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = 'auto';
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    });

    // Close with Escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + I for install
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        handleInstallGame();
    }
    
    // Ctrl/Cmd + S for continue shopping
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleContinueShopping();
    }

    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
}

// Handle window resize
function handleResize() {
    // Adjust game image size on mobile
    const isMobile = window.innerWidth <= 768;
    if (gameImage && isMobile) {
        gameImage.style.width = '100%';
        gameImage.style.height = 'auto';
    }
}

// Add animations
function addAnimations() {
    // Intersection Observer for scroll animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements for animation
        document.querySelectorAll('.purchase-details, .payment-details, .game-section, .action-buttons').forEach(el => {
            observer.observe(el);
        });
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Simulate real-time effects
function simulateRealTimeEffects() {
    // Update time every second to show "live" purchase
    setInterval(updatePurchaseTime, 1000);
    
    // Add subtle breathing animation to success banner
    addBreathingEffect();
}

// Update purchase time
function updatePurchaseTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', { 
        hour12: true,
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Update time in details occasionally
    const timeElement = document.querySelector('.detail-value:nth-of-type(4)');
    if (timeElement && Math.random() < 0.05) { // 5% chance to update
        timeElement.textContent = timeString;
    }
}

// Add breathing effect to success banner
function addBreathingEffect() {
    const banner = document.querySelector('.success-banner');
    if (banner) {
        setInterval(() => {
            banner.style.transform = 'scale(1.01)';
            setTimeout(() => {
                banner.style.transform = 'scale(1)';
            }, 1000);
        }, 4000);
    }
}

// Create install status indicator
function createInstallStatusIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'install-status';
    indicator.innerHTML = `
        <div class="status-dot"></div>
        <span>Ready to install</span>
    `;
    
    // Insert after game title
    const gameTitle = document.querySelector('.game-title');
    if (gameTitle) {
        gameTitle.parentNode.insertBefore(indicator, gameTitle.nextSibling);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add print functionality
function addPrintFunctionality() {
    // Add print button to purchase details
    const printButton = document.createElement('button');
    printButton.className = 'print-btn';
    printButton.innerHTML = 'Print Receipt';
    printButton.addEventListener('click', () => window.print());
    
    const purchaseDetails = document.querySelector('.purchase-details');
    if (purchaseDetails) {
        purchaseDetails.appendChild(printButton);
    }
}

// Add Steam-like hover effects
function addHoverEffects() {
    // Game image hover effect
    if (gameImage) {
        gameImage.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        gameImage.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    }
}

// Add Steam tooltips
function addSteamTooltips() {
    // Add tooltips to interactive elements
    const tooltipElements = [
        { element: installButton, text: 'Install and launch game' },
        { element: continueShoppingButton, text: 'Browse more games' },
        { element: gameImage, text: 'Click to view full size' }
    ];

    tooltipElements.forEach(({ element, text }) => {
        if (element) {
            element.title = text;
        }
    });
}

// Add loading spinner and additional styles
function addLoadingSpinnerStyles() {
    if (!document.querySelector('#dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            .loading-spinner {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid rgba(255,255,255,0.3);
                border-radius: 50%;
                border-top-color: #fff;
                animation: spin 1s ease-in-out infinite;
                margin-right: 8px;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            .install-progress {
                background: #2a475e;
                border: 1px solid #66c0f4;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                animation: slideInUp 0.5s ease-out;
            }

            .progress-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                font-weight: 600;
            }

            .progress-bar-container {
                background: #1A2B41;
                height: 8px;
                border-radius: 4px;
                margin-bottom: 10px;
                overflow: hidden;
            }

            .progress-bar {
                background: linear-gradient(90deg, #4c8c2a, #66c0f4);
                height: 100%;
                width: 0%;
                transition: width 0.3s ease;
            }

            .progress-info {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                color: #C5C3C0;
            }

            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }

            .modal-backdrop {
                background: rgba(0,0,0,0.9);
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                animation: scaleIn 0.3s ease;
            }

            .modal-content img {
                max-width: 100%;
                max-height: 80vh;
                border-radius: 8px;
                border: 2px solid #66c0f4;
            }

            .modal-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 30px;
                cursor: pointer;
                background: rgba(0,0,0,0.5);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s ease;
            }

            .modal-close:hover {
                background: rgba(255,0,0,0.7);
            }

            .modal-caption {
                color: white;
                text-align: center;
                margin-top: 10px;
                font-size: 16px;
                font-weight: 600;
            }

            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 6px;
                color: white;
                font-weight: 600;
                z-index: 1000;
                transform: translateX(400px);
                animation: slideInNotification 0.3s ease-out forwards;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            }

            .notification-info {
                background: #66c0f4;
            }

            .notification-warning {
                background: #ffb347;
            }

            .notification.fade-out {
                animation: slideOutNotification 0.3s ease-in forwards;
            }

            .user-dropdown {
                background: #203053;
                border: 1px solid #66c0f4;
                border-radius: 8px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.4);
                animation: fadeIn 0.2s ease;
                min-width: 200px;
            }

            .dropdown-header {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 15px;
                border-bottom: 1px solid #3c5a78;
            }

            .user-avatar {
                width: 32px;
                height: 32px;
                background: #4c8c2a;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
            }

            .user-name {
                font-weight: 600;
                color: #FFFFF4;
            }

            .user-status {
                font-size: 12px;
                color: #4c8c2a;
            }

            .dropdown-item {
                display: block;
                padding: 10px 15px;
                color: #C5C3C0;
                text-decoration: none;
                transition: background 0.3s ease;
            }

            .dropdown-item:hover {
                background: #66c0f4;
                color: #203053;
            }

            .dropdown-divider {
                height: 1px;
                background: #3c5a78;
                margin: 5px 0;
            }

            .notifications-popup {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #203053;
                border: 2px solid #66c0f4;
                border-radius: 8px;
                width: 90%;
                max-width: 400px;
                z-index: 1000;
                animation: scaleIn 0.3s ease;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }

            .popup-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                border-bottom: 1px solid #3c5a78;
            }

            .popup-header h3 {
                color: #66c0f4;
                font-size: 18px;
                margin: 0;
            }

            .popup-close {
                cursor: pointer;
                font-size: 24px;
                color: #C5C3C0;
                transition: color 0.3s ease;
            }

            .popup-close:hover {
                color: #ff4444;
            }

            .notification-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 20px;
                border-bottom: 1px solid #2a475e;
            }

            .notification-item:last-child {
                border-bottom: none;
            }

            .notif-icon {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                flex-shrink: 0;
            }

            .notif-icon.success { background: #4c8c2a; }
            .notif-icon.info { background: #66c0f4; }
            .notif-icon.promo { background: #ffb347; }

            .notif-title {
                color: #FFFFF4;
                font-weight: 600;
                font-size: 14px;
            }

            .notif-time {
                color: #8f98a0;
                font-size: 12px;
            }

            .install-status {
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 10px 0;
                font-size: 14px;
                color: #4c8c2a;
            }

            .status-dot {
                width: 8px;
                height: 8px;
                background: #4c8c2a;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }

            .print-btn {
                background: transparent;
                border: 1px solid #66c0f4;
                color: #66c0f4;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 15px;
                font-size: 14px;
                transition: all 0.3s ease;
            }

            .print-btn:hover {
                background: #66c0f4;
                color: #1A2B41;
            }

            .launch-ready {
                background: linear-gradient(90deg, #4c8c2a, #5ba32b) !important;
                animation: glow 2s infinite alternate;
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes scaleIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }

            @keyframes slideInNotification {
                to { transform: translateX(0); }
            }

            @keyframes slideOutNotification {
                to { transform: translateX(400px); }
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            @keyframes glow {
                from { box-shadow: 0 3px 10px rgba(76, 140, 42, 0.3); }
                to { box-shadow: 0 5px 20px rgba(76, 140, 42, 0.6); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Console message for developers
console.log(`
🎮 Steam Purchase Confirmation System Loaded
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ All systems operational
🔧 Interactive features enabled⌨️  Keyboard shortcuts active:
   • Ctrl/Cmd + I: Install game
   • Ctrl/Cmd + S: Continue shopping  
   • Ctrl/Cmd + P: Print receipt

💡 Click Order ID or Transaction ID to copy
🖱️  Click game image for full view
👤 Click username for account menu
🔔 Click notification bell for alerts

Steam Store Experience v2.0
`);
