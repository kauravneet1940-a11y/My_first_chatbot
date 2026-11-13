
export default async function handler(req, res) {
    // 1. Allow POST requests only
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");

        return res.status(405).json({
            error: "Method not allowed. Please use POST."
        });
    }

    try {
        // 2. Check whether the Groq API key exists
        const apiKey = process.env.GROQ_API_KEY;
        console.log(
    "Groq API key loaded:",
    Boolean(apiKey)
);

        if (!apiKey) {
            return res.status(500).json({
                error: "Groq API key is not configured on the server."
            });
        }

        // 3. Receive conversation messages from frontend
        const { messages } = req.body || {};
        // DEBUG: Check incoming message structure
console.log("Request body:", typeof req.body);
console.log("Messages is array:", Array.isArray(messages));

if (Array.isArray(messages)) {
    messages.forEach((message, index) => {
        console.log(`Message ${index + 1}:`, {
            role: message?.role,
            contentType: typeof message?.content,
            contentLength: message?.content?.length,
            isValidRole: ["user", "assistant"].includes(message?.role),
            isValidContent:
                typeof message?.content === "string" &&
                message.content.trim().length > 0 &&
                message.content.length <= 4000
        });
    });
}

        // 4. Validate incoming messages
        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                error: "Please provide a valid messages array."
            });
        }

        // Limit conversation history
        if (messages.length > 20) {
            return res.status(400).json({
                error: "Too many messages. Maximum allowed is 20."
            });
        }

        // Validate each message
        const validMessages = messages.every((message) => {
            return (
                message &&
                typeof message === "object" &&
                ["user", "assistant"].includes(message.role) &&
                typeof message.content === "string" &&
                message.content.trim().length > 0 &&
                message.content.length <= 4000
            );
        });

        if (!validMessages) {
            return res.status(400).json({
                error: "Invalid message format."
            });
        }

        // The latest message must be from the user
        if (messages[messages.length - 1].role !== "user") {
            return res.status(400).json({
                error: "The latest message must be from the user."
            });
        }

        // 5. Add instructions for the AI assistant
        const conversation = [
            {
                role: "system",
                content:
                    "You are My First AI Chatbot, a friendly and helpful AI assistant. " +
                    "Give clear, accurate and beginner-friendly answers. " +
                    "Explain difficult concepts in simple language."
            },
            ...messages.map((message) => ({
                role: message.role,
                content: message.content.trim()
            }))
        ];

        // 6. Send request to the official Groq API
        const groqResponse = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },

                body: JSON.stringify({
                    model: "openai/gpt-oss-120b",
                    messages: conversation,
                    temperature: 0.7,
                    max_completion_tokens: 1024
                })
            }
        );

        // 7. Read the API response
        const data = await groqResponse.json();

        // 8. Handle errors returned by Groq
        if (!groqResponse.ok) {
            console.error("Groq API error:", data);

            if (groqResponse.status === 429) {
                return res.status(429).json({
                    error: "Groq rate limit reached. Please try again later."
                });
            }

            return res.status(502).json({
                error: "The AI service could not process your request."
            });
        }

        // 9. Extract the AI-generated response
        const aiReply = data.choices?.[0]?.message?.content;

        if (typeof aiReply !== "string" || !aiReply.trim()) {
            return res.status(502).json({
                error: "The AI returned an empty response."
            });
        }

        // 10. Send the response back to frontend
        return res.status(200).json({
            reply: aiReply.trim()
        });

    } catch (error) {
        // 11. Handle unexpected server errors
        console.error("Chat backend error:", error);

        return res.status(500).json({
            error: "Something went wrong on the server. Please try again."
        });
    }
}
