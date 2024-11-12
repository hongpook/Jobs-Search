require('dotenv').config();
const { OpenAI } = require("openai");


// Load biến môi trường từ file .env


// Khởi tạo OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Sử dụng OpenAI để tạo văn bản
const generateText = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.choices[0].message.content.trim();
};

module.exports = generateText;
