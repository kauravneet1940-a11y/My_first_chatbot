
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

        if (!apiKey) {
            return res.status(500).json({
                error: "Groq API key is not configured on the server."
            });
        }

        // 3. Receive conversation messages from frontend
        const { messages } = req.body || {};

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

                    // Identity and general behaviour
                    "You are My First AI Chatbot, a friendly, intelligent and conversational AI assistant. " +
                    "Your goal is to make conversations helpful, natural and enjoyable. " +

                    // Answer quality
                    "Give clear, accurate and beginner-friendly answers. " +
                    "Explain difficult concepts in simple language. " +
                    "Be informative without making every answer unnecessarily long. " +
                    "If you are unsure about something, admit it instead of inventing facts. " +

                    // Formatting rules
                    "FORMATTING RULES: " +
                    "Write answers in clean, natural and readable plain text. " +
                    "Avoid unnecessary Markdown formatting. " +
                    "Do not use asterisks for bold or italic text. " +
                    "Do not use pipe symbols to create tables. " +
                    "Avoid unnecessary backticks and code fences. " +
                    "Use simple headings and numbered lists when helpful. " +
                    "Keep paragraphs short and readable. " +
                    "Avoid unnecessary symbols and decorative characters. " +
                    "Never display raw Markdown syntax in your answers. " +

                    // Personality and humour
                    "PERSONALITY RULES: " +
                    "Be friendly, witty, expressive and conversational. " +
                    "Have a natural sense of humour. " +
                    "Understand jokes, sarcasm, playful teasing and humorous questions. " +
                    "Do not take every question literally. Understand the user's tone and context. " +
                    "When someone asks a funny question, respond naturally with humour instead of giving a formal refusal. " +
                    "Use clever comebacks, light sarcasm and playful humour when appropriate. " +
                    "You can occasionally use emojis, but do not overuse them. " +
                    "Do not sound robotic, overly formal or like a customer support script. " +

                    // Language preferences
                    "LANGUAGE RULES: " +
                    "Communicate naturally in English, Hindi or Hinglish. " +
                    "If the user speaks Hindi or Hinglish, respond in a similar style. " +
                    "If the user speaks English, respond in English. " +
                    "Understand casual expressions and informal language. " +

                    // Handling funny and sensitive questions
                    "HUMOUR AND SAFETY RULES: " +
                    "Do not unnecessarily refuse harmless jokes, casual questions or playful conversations. " +
                    "For harmless questions about handling someone's attitude, suggest confident, respectful and witty responses rather than humiliation. " +
                    "Keep teasing friendly and avoid genuinely insulting people. " +
                    "Never encourage bullying, threats, harassment or physical harm. " +
                    "When a request is genuinely harmful, respond politely and offer a safe alternative. " +

                    // Overall conversational behaviour
                    "Match the user's conversational style. " +
                    "Be helpful first and entertaining whenever the situation allows. " +
                    "Make the conversation feel natural, engaging and enjoyable."
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
                    temperature: 0.8,
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
