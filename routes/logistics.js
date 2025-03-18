const express = require('express');
const router = express.Router();
const db = require('../db'); // PostgreSQL connection

router.get('/', async (req, res) => {
  const inventory = await db.query('SELECT * FROM inventory');
  res.render('logistics-dashboard', { inventory: inventory.rows });
});

router.get('/inventory/stream', async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  const intervalId = setInterval(async () => {
    try {
      const inventory = await db.query('SELECT * FROM inventory');
      res.write(`data: ${JSON.stringify(inventory.rows)}\n\n`);
    } catch (err) {
      console.error('Error fetching inventory:', err);
    }
  }, 5000); // Update every 5 seconds

  req.on('close', () => {
    clearInterval(intervalId);
  });
});

module.exports = router;