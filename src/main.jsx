import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const express = require('express');
const app = express();
const path = require('path');

// Serve static files with the correct MIME type
app.use(express.static('public', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  },
}));

// Serve your React app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
