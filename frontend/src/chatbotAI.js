const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/webhook", async (req, res) => {
    const userMessage = req.body.queryResult.queryText;

    try {
        // Gọi API GPT (OpenAI hoặc mô hình AI khác)
        const response = await axios.post("https://api.openai.com/v1/completions", {
            prompt: userMessage,
            model: "text-davinci-003",
            max_tokens: 150,
        }, {
            headers: {
                "Authorization": `Bearer YOUR_API_KEY`,
                "Content-Type": "application/json"
            }
        });

        const aiResponse = response.data.choices[0].text.trim();

        // Trả về câu trả lời từ AI
        res.json({
            fulfillmentText: aiResponse
        });
    } catch (error) {
        console.error("Error calling AI API:", error);
        res.status(500).send("Error processing request.");
    }
});

app.listen(5001, () => console.log("Webhook server is running on port 5001"));
