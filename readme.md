
# 🤖 My First AI Chatbot

A beginner-friendly AI chatbot built using HTML,
CSS, JavaScript, Node.js and Groq API.

This project demonstrates how to build a simple
AI-powered chatbot and deploy it using Vercel.

---

## 1. Project Overview

My First AI Chatbot is a web-based application
that allows users to communicate with an AI
assistant through a simple chat interface.

Users can enter questions and receive
AI-generated responses.

The chatbot also maintains conversation history
during the current browser session, allowing
the AI to understand previous messages.

---

## 2. Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML | Frontend structure |
| CSS | Frontend styling |
| JavaScript | Frontend functionality |
| Node.js | Backend development |
| Groq API | AI-generated responses |
| Vercel | Hosting and deployment |
| Git | Version control |
| GitHub | Source code hosting |

---

## 3. Features

- Simple and modern chatbot interface.
- AI-generated responses using Groq.
- User and AI message separation.
- Conversation history during the session.
- Enter key support.
- Loading animation.
- Error handling.
- Responsive design for mobile and desktop.
- Secure API key management.
- Vercel serverless backend.

---

## 4. Project Structure

my-first-chatbot/
│
├── api/
│   └── chat.js
│
├── src/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── script.js
│
├── docs/
│   └── project-notes.md
│
├── index.html
├── package.json
├── .gitignore
├── .env.local
├── .env.example
└── README.md

---

## 5. Prerequisites

Before starting, install the following:

1. Node.js (version 20 or later).
2. npm (included with Node.js).
3. Visual Studio Code or another code editor.
4. Git.
5. A GitHub account.
6. A Groq account.
7. A Vercel account.

Useful links:

Node.js:
https://nodejs.org/

Visual Studio Code:
https://code.visualstudio.com/

Git:
https://git-scm.com/

GitHub:
https://github.com/

Groq:
https://console.groq.com/

Vercel:
https://vercel.com/

---

## 6. Download or Clone the Project

If you are downloading this project from GitHub,
open your terminal and execute:

git clone YOUR_GITHUB_REPOSITORY_URL

Move into the project directory:

cd my-first-chatbot

If you already have the project folder,
simply open that folder in your terminal.

---

## 7. Install Dependencies

Run:

npm install

This command installs the development
dependencies listed in package.json.

It also creates the node_modules folder.

---

## 8. Configure Groq API Key

The chatbot requires a Groq API key to
generate AI responses.

Step 1:

Visit:

https://console.groq.com/keys

Step 2:

Sign in to your Groq account.

Step 3:

Generate a new API key.

Step 4:

Create a file named:

.env.local

Place it in the project root directory.

Step 5:

Add the following variable:

GROQ_API_KEY=your_actual_groq_api_key

Replace the placeholder with your actual key.

IMPORTANT:

- Never share your API key.
- Never upload .env.local to GitHub.
- Never place the API key in frontend JavaScript.
- Every developer must use their own API key.

The .env.example file provides a sample
environment variable configuration.

---

## 9. Run the Project Locally

Open your terminal inside the project folder.

Execute:

npm run dev

Vercel CLI will start the local development
server.

Open the local URL displayed in your terminal.

Usually, it will be:

http://localhost:3000

You can now start chatting with your AI assistant.

IMPORTANT:

Do not open index.html directly by double-clicking it.

Use Vercel CLI because the chatbot needs
the /api/chat backend endpoint.

---

## 10. How the Chatbot Works

1. The user enters a message.
2. JavaScript reads the message.
3. The message is added to conversation history.
4. JavaScript sends a POST request to /api/chat.
5. The Node.js backend receives the request.
6. The backend reads the Groq API key.
7. The backend communicates with Groq API.
8. Groq generates an AI response.
9. The backend returns the response in JSON.
10. JavaScript displays the response.

---

## 11. Deploy on Vercel

Step 1: Create a Vercel account.

Visit:

https://vercel.com/

Sign up using your GitHub account.

Step 2: Push your project to GitHub.

Make sure your .env.local file is not uploaded.

Step 3: Import your GitHub repository into Vercel.

Step 4: Configure the environment variable.

Open your Vercel project:

Settings → Environment Variables

Add:

Name:
GROQ_API_KEY

Value:
Your actual Groq API key.

Select the Production environment.

You may also select Preview if you want
the key available for preview deployments.

Step 5: Save the environment variable.

Step 6: Deploy the project.

Vercel will host your frontend and backend.

Step 7: Open your deployment URL and test
the chatbot.

---

## 12. Troubleshooting

### Problem 1: API key not configured

Reason:
The GROQ_API_KEY environment variable
is missing or incorrectly configured.

Solution:
Check .env.local for local development
or Vercel Environment Variables for deployment.

### Problem 2: Unable to get AI response

Reason:
The Groq API may be unavailable, the key
may be invalid, or the model may be unavailable.

Solution:
Check your API key, Groq API status and
backend logs.

### Problem 3: Rate limit error

Reason:
The API usage limit may have been reached.

Solution:
Wait and try again later.

### Problem 4: Backend endpoint not working

Reason:
The project may not be running through
Vercel CLI.

Solution:
Run:

npm run dev

### Problem 5: Changes are not visible after deployment

Solution:
Make sure your latest changes have been
committed and pushed to GitHub.

Then redeploy the project through Vercel.

---

## 13. Future Enhancements

The project can be improved by adding:

1. Clear chat functionality.
2. Dark mode.
3. Voice input and output.
4. Permanent conversation storage.
5. Multiple AI model selection.
6. Improved conversation history management.
7. Markdown formatting for AI responses.

---

## 14. Learning Outcomes

By completing this project, students will learn:

- Basic frontend development.
- JavaScript DOM manipulation.
- Asynchronous JavaScript.
- HTTP requests and responses.
- REST API integration.
- Backend development using Node.js.
- Environment variable management.
- AI integration using Groq API.
- Git and GitHub.
- Cloud deployment using Vercel.

---

## 15. Conclusion

My First AI Chatbot is an educational project
designed to introduce beginners to full-stack
web development and Artificial Intelligence.

It demonstrates how HTML, CSS, JavaScript
and Node.js can be combined with an external
AI API to create a functional chatbot.

The project also introduces important
development practices such as API security,
version control and cloud deployment.

---

**Project Name:** My First AI Chatbot

**Project Type:** Beginner Full-Stack AI Project

**License:** MIT
