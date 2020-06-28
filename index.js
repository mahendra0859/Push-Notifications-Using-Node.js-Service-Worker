require('dotenv').config();
const express = require('express');
const webpush = require('web-push');
const path = require('path');
const port = process.env.PORT || 5000;

const app = express();

// Set static path

app.use(express.static(path.join(__dirname, 'client')));

app.use(express.json());

// const vapidKeys = webpush.generateVAPIDKeys();
// console.log('vapidKeys', vapidKeys);

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post('/subscribe', (req, res) => {
  // Get push subscription object
  const subscription = req.body;

  //   Send 201 - resource created
  res.status(201).json({});

  //   Create Payload
  const payload = JSON.stringify({ title: 'Push test' });

  // Pass the object into send notification function
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error('Error: ', err));
});

app.listen(port, () => console.log(`Server is started on port number ${port}`));
