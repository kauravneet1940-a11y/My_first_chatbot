
// ============================================
// 1. GET HTML ELEMENTS
// ============================================

const chatMessages = document.getElementById("chat-messages");

const userInput = document.getElementById("user-input");

const sendButton = document.getElementById("send-button");


// ============================================
// 2. STORE CONVERSATION HISTORY
// ============================================

// This array stores messages during the current session.
// It is not permanently saved.

let conversationHistory = [];


// ============================================
// 3. DISPLAY A MESSAGE
// ============================================

function displayMessage(sender, message) {

    // Create a new message container
    const messageElement = document.createElement("div");

    // Create sender label
    const labelElement = document.createElement("span");

    labelElement.classList.add("message-label");

    // Set the appropriate CSS class
    if (sender === "user") {

        messageElement.classList.add("message", "user-message");

        labelElement.textContent = "You";

    } else {

        messageElement.classList.add("message", "ai-message");

        labelElement.textContent = "AI Assistant";
    }

    // Create message content
    const contentElement = document.createElement("div");

    contentElement.textContent = message;

    // Add label and content to message container
    messageElement.appendChild(labelElement);

    messageElement.appendChild(contentElement);

    // Add message to chat area
    chatMessages.appendChild(messageElement);

    // Scroll to the latest message
    scrollToBottom();
}


// ============================================
// 4. AUTOMATIC SCROLLING
// ============================================

function scrollToBottom() {

    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// ============================================
// 5. SHOW LOADING INDICATOR
// ============================================

function showLoading() {

    const loadingElement = document.createElement("div");

    loadingElement.id = "loading-indicator";

    loadingElement.classList.add("loading-message");

    loadingElement.innerHTML = `
        AI is thinking
        <span class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </span>
    `;

    chatMessages.appendChild(loadingElement);

    scrollToBottom();
}


// ============================================
// 6. REMOVE LOADING INDICATOR
// ============================================

function removeLoading() {

    const loadingElement = document.getElementById(
        "loading-indicator"
    );

    if (loadingElement) {
        loadingElement.remove();
    }
}


// ============================================
// 7. DISPLAY ERROR MESSAGE
// ============================================

function displayError(message) {

    const errorElement = document.createElement("div");

    errorElement.classList.add("error-message");

    errorElement.textContent = message;

    chatMessages.appendChild(errorElement);

    scrollToBottom();
}


// ============================================
// 8. SEND MESSAGE TO BACKEND
// ============================================

async function sendMessage() {

    // Read and remove unnecessary spaces
    const message = userInput.value.trim();

    // Do not send an empty message
    if (message === "") {
        return;
    }

    // Prevent multiple requests at the same time
    sendButton.disabled = true;

    userInput.disabled = true;

    // Display the user's message
    displayMessage("user", message);

    // Add user message to conversation history
    conversationHistory.push({
        role: "user",
        content: message
    });

    // Clear the input box
    userInput.value = "";

    // Show loading animation
    showLoading();

    try {

        // Send conversation history to backend
        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                messages: conversationHistory
            })
        });


        // Convert response into JavaScript object
        const data = await response.json();


        // Check for backend or API errors
        if (!response.ok) {

            throw new Error(
                data.error || "Unable to get an AI response."
            );
        }


        // Check whether the AI response exists
        if (typeof data.reply !== "string" || !data.reply.trim()) {

            throw new Error("The AI returned an invalid response.");
        }


        // Store the AI response in conversation history
        conversationHistory.push({
            role: "assistant",
            content: data.reply
        });


        // Display AI response
        displayMessage("assistant", data.reply);

    }

    catch (error) {

        console.error("Chatbot error:", error);

        // Remove the failed user message from history.
        // This allows the user to retry without duplicating it.
        conversationHistory.pop();

        displayError(
            error.message || "Something went wrong. Please try again."
        );

    }

    finally {

        // Always remove loading animation
        removeLoading();

        // Enable the input and button again
        sendButton.disabled = false;

        userInput.disabled = false;

        // Return cursor to input box
        userInput.focus();
    }
}


// ============================================
// 9. SEND BUTTON EVENT
// ============================================

sendButton.addEventListener("click", sendMessage);


// ============================================
// 10. ENTER KEY EVENT
// ============================================

userInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();
    }

});


// ============================================
// 11. INITIAL WELCOME MESSAGE
// ============================================

displayMessage(
    "assistant",
    "Hey there! 👋 Got a question? An idea? A random thought at 2 AM? I'm ready. Let's explore! 🚀"
);
