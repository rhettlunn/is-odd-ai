// index.js

const axios = require('axios');
require('dotenv').config();


// Function to check if a number is odd using OpenAI ChatGPT
async function isOdd(number) {
    try {
        // Construct the request payload
        const requestData = {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Is ${number} odd or even?` }],
            temperature: 0.7
        };

        // Make a POST request to OpenAI API
        const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Use environment variable for API key
            }
        });

        // Parse the response
        const { choices } = response.data;
        const answer = choices[0].message.content.trim().toLowerCase(); // Adjust based on API response structure

        // Determine if the response indicates odd or even
        if (answer.includes('odd')) {
            return true;
        } else if (answer.includes('even')) {
            return false;
        } else {
            throw new Error('Unable to determine if number is odd or even.');
        }
    } catch (error) {
        console.error('Error querying OpenAI:', error);
        throw error;
    }
}

module.exports = isOdd;

