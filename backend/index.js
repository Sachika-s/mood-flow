const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { CohereClientV2 } = require('cohere-ai');

const cohere = new CohereClientV2({
  token: 'hl1ibuL2p5J4d46NmiH5vG8lyxvkYI0AJqO7KNYG',
});


// Initialize Cohere with your API key
//cohere.init('deD0tkNH15gVpwNLeQMcVWg1iTLy9gpGSvUuXXBA');  // Replace with your actual Cohere API key

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle journal entry and generate advice
app.post('/generate-advice', async (req, res) => {
  const { entry } = req.body;

  // Check if the entry is provided in the request body
  if (!entry) {
    console.error('No entry provided in the request body.');
    return res.status(400).json({ error: 'Journal entry is required.' });
  }

  try {
    console.log('Received journal entry:', entry);  // Log the entry

    /*// Generate advice using Cohere
    const response = await cohere.generate({
      model: 'command-xlarge-nightly',  // You can change the model if needed
      prompt: `The user wrote: "${entry}". Provide thoughtful and empathetic advice.`,
      max_tokens: 100,
      temperature: 0.7,
      length: 100,
    });*/

    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'user',
          content: `The user is feeling: "${entry}". Provide thoughtful, empathetic but short advice to help them feel better.`,  // Changed to provide advice based on the user's mood
        },
      ],
    });

    // Check if the response contains valid generations
    // if (!response.body || !response.body.generations) {
    //   console.error('Invalid Cohere response:', response);
    //   return res.status(500).json({ error: 'Failed to generate advice.' });
    // }

    // Extract the generated advice from the response and send it back to the client
    const advice = response.message.content[0].text.trim();
    res.json({ advice });

  } catch (error) {
    // Log the error if the API call fails
    console.error('Error while calling Cohere:', error);

    // Send a meaningful error response
    res.status(500).json({ error: 'Error connecting to Cohere API.' });
  }
});

// Set the port for the server to listen on
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
