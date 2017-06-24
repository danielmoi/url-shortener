/* eslint-disable camelcase */
const express = require('express');
const mongoose = require('mongoose');
const rs = require('randomstring');
const { URL } = require('url');

const router = express.Router();
const Url = mongoose.model('Url');

const generate = async () => {
  let key = rs.generate({ length: 7, capitalization: 'lowercase' });
  const existing = await Url.findOne({ key });
  if (existing) {
    key = generate();
  }
  return key;
};

router.get('/health', (req, res) => {
  res.send('OK');
});

router.get('/shorten/:url*', async (req, res) => {
  const url = req.originalUrl.slice(9);
  let valid;

  try {
    valid = new URL(url);
  } catch (e) {
    return res.json({ error: 'Invalid URL' });
  }

  const protocol = req.protocol;
  const host = req.headers.host;
  const key = await generate();

  const shortened_url = `${protocol}://${host}/${key}`;

  const data = {
    original_url: valid.toString(),
    key,
    shortened_url,
  };

  const record = new Url(data);
  await record.save();

  return res.json({
    data,
  });
});

router.get('/:key', async (req, res) => {
  const key = req.params.key;

  const record = await Url.findOne({
    key,
  });

  if (!record) {
    return res.json({
      error: 'No record for that key',
    });
  }

  const url = record.original_url;
  return res.redirect(url);
});

router.get('/*', (req, res) => {
  const protocol = req.protocol;
  const host = req.headers.host;

  const url = `${protocol}://${host}`;
  const suggest = `${url}/shorten/http://google.com`;

  res.send({
    try_this: suggest,
  });
});

module.exports = router;
