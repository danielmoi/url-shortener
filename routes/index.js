const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.send('OK');
});

router.get('/:url', (req, res) => {
  const url = req.params.url;
  res.json({
    url,
  });
});

router.get('/', (req, res) => {
  res.send({
    this: 'works',
  });
});

module.exports = router;
