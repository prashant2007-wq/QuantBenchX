const express = require('express');
const app = express();
app.use(express.json());

let orderIdCounter = 1;

// Basic mocked orderbook
app.post('/order', (req, res) => {
  const { symbol, side, price, quantity } = req.body;
  if (!symbol || !side || !price || !quantity) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  // Simulate processing time
  const start = process.hrtime.bigint();
  
  const orderId = orderIdCounter++;
  
  const end = process.hrtime.bigint();
  const latencyNs = end - start;

  res.json({
    orderId,
    status: 'Accepted',
    latency_ns: latencyNs.toString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Sample Engine listening on port ${PORT}`);
});
