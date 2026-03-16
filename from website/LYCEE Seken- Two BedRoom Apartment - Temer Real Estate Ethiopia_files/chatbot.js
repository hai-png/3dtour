(function() {
    // Create a unique namespace for the chatbot
    window.PropertyChatbot = {
        chatMessages: null,
        userInputContainer: null,
        userInput: null,
        currentStep: 0,
        userData: {},
        hasStarted: false,

        init: function() {
            this.chatMessages = document.getElementById('propertyChatMessages');
            this.userInputContainer = document.getElementById('propertyUserInputContainer');
            this.userInput = document.getElementById('propertyUserInput');
            
            // Add event listener for user input
            this.userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && this.userInput.value.trim() !== '') {
                    this.sendMessage();
                }
            });
        },

        validateName: function(name) {
            const nameRegex = /^[a-zA-Z\s]{2,50}$/;
            return nameRegex.test(name);
        },

        validatePhone: function(phone) {
            const phoneRegex = /^\d{10}$/;
            return phoneRegex.test(phone);
        },

        sendMessage: function() {
            const input = this.userInput.value.trim();
            if (input !== '') {
                this.userInput.value = '';
                this.handleUserInput(input);
            }
        },

        toggleChat: function() {
            const chatContainer = document.getElementById('propertyChatContainer');
            if (chatContainer.style.display === 'none') {
                chatContainer.style.display = 'block';
                if (!this.hasStarted) {
                    this.startConversation();
                    this.hasStarted = true;
                }
            } else {
                chatContainer.style.display = 'none';
            }
        },

        addMessage: function(message, isBot = true) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
            messageDiv.textContent = message;
            this.chatMessages.appendChild(messageDiv);
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        },

        showTyping: function() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            this.chatMessages.appendChild(typingDiv);
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            return typingDiv;
        },

        showOptions: function(options) {
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';
            
            options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option-button';
                button.textContent = option;
                button.onclick = () => this.handleUserInput(option);
                optionsContainer.appendChild(button);
            });
            
            this.chatMessages.appendChild(optionsContainer);
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        },

        startConversation: async function() {
            const typing = this.showTyping();
            await new Promise(resolve => setTimeout(resolve, 1500));
            typing.remove();
            
            this.addMessage("Hi! Nice to meet you! 👋");
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            const typing2 = this.showTyping();
            await new Promise(resolve => setTimeout(resolve, 1500));
            typing2.remove();
            
            this.addMessage("I'm here to help you find your perfect apartment!");
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            const typing3 = this.showTyping();
            await new Promise(resolve => setTimeout(resolve, 1500));
            typing3.remove();
            
            this.addMessage("Which apartment are you interested in?");
            
            this.showOptions([
                "Ayat Feres Bet",
                "Sarbet",
                "Ayat Lomiyad",
                "Aware",
                "Lycee",
                "Adwa",
                "Ayat Lomiyad",
                "Ayat To Center"
            ]);
        },

        handleUserInput: async function(input) {
            if (input) {
                this.addMessage(input, false);
                
                switch(this.currentStep) {
                    case 0: // Apartment selection
                        this.userData.apartment = input;
                        const typing1 = this.showTyping();
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        typing1.remove();
                        this.addMessage("Great choice! Could you please tell me your name?");
                        this.userInputContainer.classList.remove('hidden');
                        this.userInput.focus();
                        this.currentStep++;
                        break;
                        
                    case 1: // Name input
                        if (!this.validateName(input)) {
                            const typingError = this.showTyping();
                            await new Promise(resolve => setTimeout(resolve, 1500));
                            typingError.remove();
                            this.addMessage("Please enter a valid name (only letters and spaces, 2-50 characters)");
                            return;
                        }
                        this.userData.name = input;
                        const typing2 = this.showTyping();
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        typing2.remove();
                        this.addMessage(`Nice to meet you, ${input}! What's your phone number?`);
                        this.currentStep++;
                        break;
                        
                    case 2: // Phone number
                        if (!this.validatePhone(input)) {
                            const typingError = this.showTyping();
                            await new Promise(resolve => setTimeout(resolve, 1500));
                            typingError.remove();
                            this.addMessage("Please enter a valid 10-digit phone number");
                            return;
                        }
                        this.userData.phone = input;
                        this.userInputContainer.classList.add('hidden');
                        const typing3 = this.showTyping();
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        typing3.remove();
                        
                        this.addMessage("Thank you for providing your information! Let me submit that for you...");
                        
                        // Send data to WordPress database
                        try {
                            const formData = new FormData();
                            formData.append('action', 'property_chatbot_submit');
                            formData.append('nonce', propertyChatbot.nonce);
                            formData.append('data', JSON.stringify(this.userData));
                            
                            const response = await fetch(propertyChatbot.ajaxurl, {
                                method: 'POST',
                                body: formData
                            });
                            
                            const result = await response.json();
                            
                            if (result.success) {
                                this.addMessage("Perfect! Your inquiry has been submitted successfully. Our team will contact you soon at " + input);
                            } else {
                                this.addMessage("Sorry, there was an error submitting your inquiry. Please try again later.");
                            }
                        } catch (error) {
                            console.error('Error:', error);
                            this.addMessage("Sorry, there was an error submitting your inquiry. Please try again later.");
                        }
                        
                        this.currentStep = 0;
                        this.userData = {};
                        this.hasStarted = false;
                        break;
                }
            }
        }
    };

    // Initialize the chatbot when the DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        window.PropertyChatbot.init();
    });

    // Make toggleChat function globally available
    window.togglePropertyChat = function() {
        window.PropertyChatbot.toggleChat();
    };
})();