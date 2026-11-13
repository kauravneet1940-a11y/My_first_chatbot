
# My First AI Chatbot - Project Notes

## 1. Project Introduction

My First AI Chatbot is a beginner-friendly
Artificial Intelligence chatbot application.

It allows users to enter questions and receive
AI-generated responses.

The application uses HTML, CSS and JavaScript
for the frontend, Node.js for the backend,
and Groq API to generate AI responses.

The application is deployed using Vercel.

## 2. Technologies Used

### HTML
HTML is used to create the structure of the
chatbot webpage.

It contains the heading, chat area, input field
and send button.

### CSS
CSS is used to design the chatbot interface.

It controls colours, spacing, message bubbles,
alignment and responsive layouts.

### JavaScript
JavaScript handles the chatbot functionality.

It reads user messages, displays conversations,
maintains conversation history and communicates
with the backend.

### Node.js
Node.js runs the backend JavaScript code.

It processes incoming requests and securely
communicates with the Groq API.

### Groq API
Groq provides access to AI language models.

It receives conversation messages and generates
AI responses.

### Vercel
Vercel hosts the frontend and backend.

It also runs the backend as a serverless function.

### Git and GitHub
Git tracks changes in the project.

GitHub stores the project's source code online
and allows developers to share their work.

## 3. Project Architecture

The project follows a simple client-server
architecture.

The frontend communicates with the backend
through an HTTP POST request.

The backend sends the conversation to Groq.

Groq generates an AI response and sends it
back to the backend.

The backend returns the response to the frontend,
where JavaScript displays it in the chat area.

## 4. Working Process

Step 1:
The user opens the chatbot webpage.

Step 2:
The user enters a question in the input field.

Step 3:
JavaScript reads the message.

Step 4:
The message is stored in conversation history.

Step 5:
JavaScript sends the conversation to
/api/chat using the fetch() method.

Step 6:
The Node.js backend receives the request.

Step 7:
The backend reads the Groq API key from
the environment variable.

Step 8:
The backend sends the conversation to
the Groq Chat Completions API.

Step 9:
Groq generates the AI response.

Step 10:
The backend returns the response in JSON format.

Step 11:
JavaScript displays the AI response on the webpage.

## 5. Folder Structure

### api/

This folder contains backend API functions.

chat.js:
Receives messages, validates requests and
communicates with the Groq API.

### src/

This folder contains frontend resources.

#### css/

style.css:
Contains all the styling and responsive
design of the chatbot.

#### js/

script.js:
Contains frontend JavaScript functionality,
including event handling and API communication.

### docs/

This folder contains project documentation.

project-notes.md:
Explains the architecture, technologies and
working process of the application.

## 6. Root Files

index.html:
Contains the structure of the chatbot webpage.

package.json:
Contains project configuration, npm scripts
and development dependencies.

.gitignore:
Prevents sensitive and unnecessary files
from being uploaded to GitHub.

.env.local:
Stores the actual Groq API key for local
development.

.env.example:
Provides a template for required environment
variables without exposing secret values.

README.md:
Provides project information and setup
instructions for other developers.

## 7. What Is an API?

API stands for Application Programming Interface.

It allows two software applications to
communicate with each other.

In this project, our backend uses the Groq API
to send questions and receive AI responses.

## 8. What Is a Serverless Function?

A serverless function is a backend function
that runs on a cloud platform when requested.

In this project, api/chat.js is deployed as
a Vercel serverless function.

We do not need to maintain our own server.

## 9. What Is Conversation History?

Conversation history stores previous user
messages and AI responses in a JavaScript array.

It allows the AI to understand the context
of previous messages.

The conversation is stored temporarily in
browser memory and is not saved permanently.

## 10. Security

The Groq API key is stored in an environment
variable called GROQ_API_KEY.

The key is accessed only by the backend.

It is never included in frontend JavaScript
or committed to GitHub.

The .gitignore file excludes .env.local.

For deployment, the API key must be added
to Vercel environment variables.

## 11. Project Limitations

1. The chatbot requires an internet connection.
2. It depends on the availability of Groq API.
3. API usage may be subject to rate limits.
4. Conversations are not permanently stored.
5. The chatbot currently supports text messages only.
6. Conversation history is limited to 20 messages
   per request.

## 12. Future Improvements

1. Add a clear-chat button.
2. Add dark mode.
3. Add voice input and output.
4. Add permanent conversation storage.
5. Add support for multiple AI models.
6. Improve conversation history management.

## 13. Conclusion

My First AI Chatbot demonstrates how frontend
technologies can communicate with a backend
and integrate an external Artificial Intelligence
API.

It provides practical experience with HTML,
CSS, JavaScript, Node.js, API integration,
environment variables, Git, GitHub and Vercel.
