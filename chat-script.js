// Initialize chat when page loads
function initChat() {
    const fileUpload = document.getElementById('file-upload');
    const sendToAIBtn = document.getElementById('send-to-ai-btn');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    const uploadBox = document.querySelector('.upload-box');
    const uploadPreview = document.getElementById('upload-preview');

    // Handle file upload preview
    fileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadPreview.src = e.target.result;
                uploadBox.classList.add('has-preview');
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle send to AI button click
    sendToAIBtn.addEventListener('click', function() {
        if (uploadPreview.src) {
            // Add loading state
            sendToAIBtn.classList.add('loading');
            
            // Simulate AI processing (you would replace this with actual API call)
            setTimeout(() => {
                sendToAIBtn.classList.remove('loading');
                
                // Add AI response about ingredients
                addMessage('ai', `Hey! I see you have the following ingredients in the fridge:

• Cauliflower
• Green, round vegetables (possibly limes)
• Red cabbage
• Radishes
• Water bottles
• Cheese
• Milk (or cream)
• Eggs
• Scallions (green onions)
• Red bell pepper
• Yellow bell pepper
• Orange bell pepper
• Green lettuce

Based on the ingredients in the fridge, I can suggest a few different types of meals. What are you in the mood for?

1. A breakfast/brunch (like an omelette)
2. A light, crunchy salad
3. A warm vegetable side dish`);
            }, 1500);
        }
    });

    // Handle send message button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Handle enter key press in input
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage('user', message);
            chatInput.value = '';

            // Process user response
            if (message.toLowerCase().includes('breakfast') || message.toLowerCase().includes('brunch')) {
                setTimeout(() => {
                    addMessage('ai', `Great choice! For a breakfast/brunch option, the best recipe using those ingredients is a Simple Veggie Omelette.

This recipe will use the eggs, cheese, bell peppers, scallions, and a splash of milk.

Simple Veggie Omelette
Ingredients:

• 2-3 eggs
• 1 tablespoon of milk (optional, for fluffiness)
• A handful of grated cheese
• 1/4 cup of chopped bell peppers (you can mix the colors)
• 1-2 scallions, thinly sliced
• Salt and pepper (assuming you have this)
• 1 teaspoon of butter or oil (assuming you have this)

Steps:

1. Prep: Chop your bell peppers and slice the scallions. Grate the cheese.

2. Whisk Eggs: In a bowl, crack the eggs. Add the splash of milk, salt, and pepper. Whisk well until fully combined.

3. Cook Veggies: Heat the butter or oil in a non-stick pan over medium heat. Add the chopped bell peppers and cook for 2-3 minutes until they start to soften.

4. Add Eggs: Pour the whisked egg mixture over the peppers in the pan. Let it cook undisturbed for about a minute until the edges start to set.

5. Cook Omelette: Gently pull the cooked edges toward the center with a spatula, tilting the pan to let the uncooked egg flow to the empty spaces.

6. Add Fillings: When the eggs are mostly set but still slightly runny on top, sprinkle the cheese and sliced scallions over one half of the omelette.

7. Fold: Carefully fold the other half of the omelette over the fillings. Let it cook for another 30 seconds to 1 minute, until the cheese is melted.

8. Serve: Gently slide the omelette onto a plate.`);
                }, 1000);
            }
        }
    }

    function addMessage(type, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        // Convert line breaks to paragraphs and bullet points
        const formattedContent = content
            .split('\n')
            .map(line => {
                if (line.trim().startsWith('•')) {
                    return `<li>${line.trim().substring(1).trim()}</li>`;
                }
                return line;
            })
            .join('\n')
            .split('\n\n')
            .map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`)
            .join('');
        
        messageDiv.innerHTML = formattedContent;
        
        // If there are bullet points, wrap them in a ul
        if (messageDiv.innerHTML.includes('<li>')) {
            messageDiv.innerHTML = messageDiv.innerHTML.replace(/<li>.*?<\/li>/gs, match => `<ul>${match}</ul>`);
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', initChat);