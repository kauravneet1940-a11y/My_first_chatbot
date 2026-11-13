
// ============================================
// 1. GET HTML ELEMENTS
// ============================================

const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");


// ============================================
// 2. STORE CONVERSATION HISTORY
// ============================================

let conversationHistory = [];


// ============================================
// 3. DISPLAY A MESSAGE
// ============================================

function displayMessage(sender, message) {

    const messageElement = document.createElement("div");

    const labelElement = document.createElement("span");

    labelElement.classList.add("message-label");

    if (sender === "user") {

        messageElement.classList.add("message", "user-message");
        labelElement.textContent = "You";

    } else {

        messageElement.classList.add("message", "ai-message");
        labelElement.textContent = "AI Assistant";
    }

    const contentElement = document.createElement("div");

    contentElement.classList.add("message-content");

    // User messages are displayed as plain text.
    if (sender === "user") {

        contentElement.textContent = message;

    } else {

        // Convert AI Markdown into formatted HTML.
        // DOMPurify sanitizes the HTML before displaying it.
        if (window.marked && window.DOMPurify) {

            const formattedHTML = marked.parse(message, {
                breaks: true,
                gfm: true
            });

            contentElement.innerHTML = DOMPurify.sanitize(formattedHTML);

        } else {

            // Safe fallback if the libraries fail to load.
            contentElement.textContent = message;

            console.error("Markdown libraries could not be loaded.");
        }
    }

    messageElement.appendChild(labelElement);
    messageElement.appendChild(contentElement);

    chatMessages.appendChild(messageElement);

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

    const message = userInput.value.trim();

    if (message === "") {
        return;
    }

    sendButton.disabled = true;
    userInput.disabled = true;

    displayMessage("user", message);

    conversationHistory.push({
        role: "user",
        content: message
    });

    userInput.value = "";

    showLoading();

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                messages: conversationHistory
            })
        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.error || "Unable to get an AI response."
            );
        }

        if (typeof data.reply !== "string" || !data.reply.trim()) {

            throw new Error("The AI returned an invalid response.");
        }

        conversationHistory.push({
            role: "assistant",
            content: data.reply
        });

        displayMessage("assistant", data.reply);

    }

    catch (error) {

        console.error("Chatbot error:", error);

        conversationHistory.pop();

        displayError(
            error.message || "Something went wrong. Please try again."
        );

    }

    finally {

        removeLoading();

        sendButton.disabled = false;
        userInput.disabled = false;

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
