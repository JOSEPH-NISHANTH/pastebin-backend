const express = require('express');
const app = express();
const cors = require('cors');  // Add this line


// Midd leware to parse JSON bodies
app.use(express.json());


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// GET route with parameter
app.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const content = parseInt(id);
    if (!content) {
      return res.status(404).json({ error: 'Paste not found' });
    }
    res.json({ content });
  } catch (error) {
    console.error('GET error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST route to create paste
app.post('/paste', (req, res) => {
  try {
    console.log('POST /paste received, body:', req.body);
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    res.json({ 
      success: true, 
      id: Math.floor(Math.random() * 1000),
      content 
    });
  } catch (error) {
    console.error('POST error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
try {
 app.listen(5000, () => {  // Changed to 5001
  console.log('TEST BACKEND running on http://localhost:5000/');
});
} catch (error) {
  console.error('Failed to start server:', error);
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});