document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotBox = document.querySelector('.chatbot-box');
    const closeChat = document.querySelector('.close-chat');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-message');

    // Bot responses database
    const botResponses = {
        services: {
            message: "We offer various event management services including:\n- Corporate Events\n- Wedding Planning\n- Stage Shows\n- Celebrity Management\n\nWhich service interests you?",
            quickReplies: ['Corporate Events', 'Wedding Planning', 'Stage Shows', 'Celebrity Management']
        },
        quote: {
            message: "I'll help you get a quote. Please tell me:\n1. Type of event\n2. Expected number of guests\n3. Preferred date\n4. Location",
            quickReplies: ['Corporate', 'Wedding', 'Stage Show', 'Other']
        },
        contact: {
            message: "You can reach us at:\nPhone: +91 9818064518\nEmail: info@sa-group.in\n\nWould you like us to contact you?",
            quickReplies: ['Yes, call me', 'Send email info', 'No, thanks']
        }
    };

    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotBox.classList.add('active');
    });

    closeChat.addEventListener('click', () => {
        chatbotBox.classList.remove('active');
    });

    // Handle quick replies
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-reply')) {
            const value = e.target.dataset.value;
            handleUserInput(e.target.textContent);
        }
    });

    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            handleUserInput(message);
            chatInput.value = '';
        }
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function handleUserInput(message) {
        // Add user message
        addMessage(message, 'user');

        // Bot response logic
        setTimeout(() => {
            let response;
            let quickReplies = [];

            // Simple keyword matching
            const messageLower = message.toLowerCase();
            if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('quote')) {
                response = botResponses.quote.message;
                quickReplies = botResponses.quote.quickReplies;
            } else if (messageLower.includes('service')) {
                response = botResponses.services.message;
                quickReplies = botResponses.services.quickReplies;
            } else if (messageLower.includes('contact') || messageLower.includes('call') || messageLower.includes('email')) {
                response = botResponses.contact.message;
                quickReplies = botResponses.contact.quickReplies;
            } else {
                response = "I'm not sure I understand. Would you like to know about our services, get a quote, or contact us?";
                quickReplies = ['Services', 'Get Quote', 'Contact'];
            }

            addMessage(response, 'bot', quickReplies);
        }, 500);
    }

    function addMessage(message, type, quickReplies = []) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        messageDiv.textContent = message;

        if (quickReplies.length > 0 && type === 'bot') {
            const quickRepliesDiv = document.createElement('div');
            quickRepliesDiv.classList.add('quick-replies');
            quickReplies.forEach(reply => {
                const button = document.createElement('button');
                button.classList.add('quick-reply');
                button.textContent = reply;
                button.dataset.value = reply.toLowerCase().replace(/\s+/g, '-');
                quickRepliesDiv.appendChild(button);
            });
            messageDiv.appendChild(quickRepliesDiv);
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
