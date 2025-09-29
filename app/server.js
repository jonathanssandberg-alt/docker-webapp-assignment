const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Main page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Docker Web App</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .info { 
          background-color: #e8f4f8;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🐳 Docker Web App</h1>
        <p>Denna applikation körs i en Docker container!</p>
        
        <div class="info">
          <h2>Container Information:</h2>
          <p><strong>Hostname:</strong> ${os.hostname()}</p>
          <p><strong>Platform:</strong> ${os.platform()}</p>
          <p><strong>Node Version:</strong> ${process.version}</p>
          <p><strong>Uptime:</strong> ${Math.floor(process.uptime())} sekunder</p>
        </div>
        
        <p><a href="/health">Health Check</a></p>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Container hostname: ${os.hostname()}`);
});