// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                navLinks.classList.remove('active');
            }
        });
    });
});

// Login Form Validation
function validateLogin(e) {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (email && password) {
        // Dummy validation - in real app, this would be an API call
        window.location.href = 'profile.html';
    } else {
        alert('Please fill in all fields');
    }
}

// Profile Form Handling
function saveProfile(e) {
    e.preventDefault();
    // In a real app, this would be an API call
    alert('Profile saved successfully!');
}

// Chat Functions
function initChat() {
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('#chat-input');
    const sendBtn = document.querySelector('#send-btn');

    if (chatInput && sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function sendMessage() {
    const chatInput = document.querySelector('#chat-input');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatInput.value.trim()) return;

    // Add user message
    addMessage('user', chatInput.value);

    // Simulate AI response
    setTimeout(() => {
        addMessage('ai', 'Based on your message, I suggest trying a healthy recipe with those ingredients!');
    }, 1000);

    chatInput.value = '';
}

function addMessage(type, text) {
    const chatMessages = document.querySelector('.chat-messages');
    const message = document.createElement('div');
    message.classList.add('message', `${type}-message`);
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Modal Functions
function openModal(title, content) {
    const modal = document.querySelector('.modal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalContent = modal.querySelector('.modal-body');

    modalTitle.textContent = title;
    modalContent.textContent = content;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
}

// Recipe Card Functions
function viewRecipe(title, description) {
    openModal(title, description);
}

function saveFavorite(title) {
    alert(`${title} has been saved to your favorites!`);
}

// File Upload Preview
function previewFile() {
    const preview = document.querySelector('#upload-preview');
    const file = document.querySelector('#file-upload').files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
        preview.style.display = 'block';
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.querySelector('.modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Chat Page Specific Logic
document.addEventListener('DOMContentLoaded', () => {
    const fileUpload = document.getElementById('file-upload');
    const uploadBox = document.querySelector('.upload-box');
    const uploadPreview = document.getElementById('upload-preview');
    const sendToAiBtn = document.getElementById('send-to-ai-btn');

    if (fileUpload) {
        fileUpload.addEventListener('change', handleFileSelect);
    }

    if (uploadBox) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadBox.addEventListener(eventName, preventDefaults, false);
        });
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadBox.addEventListener(eventName, () => uploadBox.classList.add('hover'), false);
        });
        ['dragleave', 'drop'].forEach(eventName => {
            uploadBox.addEventListener(eventName, () => uploadBox.classList.remove('hover'), false);
        });
        uploadBox.addEventListener('drop', handleDrop, false);
    }

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function handleFileSelect(event) {
        const files = event.target.files;
        if (files.length > 0) {
            previewImage(files[0]);
        }
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            fileUpload.files = files; // Assign dropped files to input
            previewImage(files[0]);
        }
    }

    function previewImage(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadPreview.src = e.target.result;
            uploadBox.classList.add('has-preview');
        }
        reader.readAsDataURL(file);
    }

    if (sendToAiBtn) {
        sendToAiBtn.addEventListener('click', startAiChatFlow);
    }
});

function startAiChatFlow() {
    const sendToAiBtn = document.getElementById('send-to-ai-btn');
    const uploadBox = document.querySelector('.upload-box');

    if (!uploadBox.classList.contains('has-preview')) {
        alert("Please upload an image first!");
        return;
    }

    // 1. Set button to loading state
    sendToAiBtn.classList.add('loading');
    sendToAiBtn.disabled = true;

    // 2. Show "AI is typing" indicator
    addTypingIndicator();

    // 3. Simulate AI processing
    setTimeout(() => {
        removeTypingIndicator();
        // 4. AI confirms ingredients
        addMessage('ai', "Okay, I see you have chicken breasts, broccoli, and carrots.");

        // 5. AI suggests recipes
        setTimeout(() => {
            addRecipeSuggestions();
            // Reset button
            sendToAiBtn.classList.remove('loading');
            sendToAiBtn.disabled = false;
        }, 1500);

    }, 2500);
}

function addTypingIndicator() {
    const chatMessages = document.querySelector('.chat-messages');
    const typingIndicator = `
        <div class="message ai-message typing-indicator" id="typing-indicator">
            <span></span><span></span><span></span>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function addRecipeSuggestions() {
    const chatMessages = document.querySelector('.chat-messages');
    const recipeHtml = `
        <div class="message ai-message">
            <p>Here are a couple of ideas for you:</p>
            <div class="recipe-card-horizontal" onclick="alert('Navigating to the full recipe for Roasted Chicken and Veggies!')">
                <img src="https://images.unsplash.com/photo-1518779578993-6bae68298b81?q=80&w=400" alt="Roasted Chicken">
                <div class="recipe-card-info">
                    <h4>Roasted Chicken and Veggies</h4>
                    <div class="recipe-card-meta">
                        <span><i class="fas fa-clock"></i> 45 min</span>
                        <span><i class="fas fa-fire-alt"></i> 450 kcal</span>
                    </div>
                </div>
            </div>
            <div class="recipe-card-horizontal" onclick="alert('Navigating to the full recipe for Chicken Stir-fry!')">
                <img src="https://images.unsplash.com/photo-1543339308-43e59d6b70a6?q=80&w=400" alt="Chicken Stir-fry">
                <div class="recipe-card-info">
                    <h4>Quick Chicken Stir-fry</h4>
                    <div class="recipe-card-meta">
                        <span><i class="fas fa-clock"></i> 25 min</span>
                        <span><i class="fas fa-fire-alt"></i> 400 kcal</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', recipeHtml);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Profile Picture Upload Preview
document.addEventListener('DOMContentLoaded', () => {
    const profilePicUpload = document.getElementById('profile-pic-upload');
    const profilePicPreview = document.getElementById('profile-pic-preview');
    const nameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const nameDisplay = document.getElementById('profile-name-display');
    const emailDisplay = document.getElementById('profile-email-display');

    if (profilePicUpload && profilePicPreview) {
        profilePicUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePicPreview.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Live update name/email header display
    if (nameInput && nameDisplay) {
        nameInput.addEventListener('input', () => {
            nameDisplay.textContent = nameInput.value.trim() || 'Your Name';
        });
    }
    if (emailInput && emailDisplay) {
        emailInput.addEventListener('input', () => {
            emailDisplay.textContent = emailInput.value.trim() || 'your@email.com';
        });
    }
});
