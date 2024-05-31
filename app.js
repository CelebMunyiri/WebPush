"use strict";

const config = {
    baseUrl: 'http://localhost:7000', // Replace with your microservice base URL
    apiKey: 'YOUR_API_KEY', // Replace with your API key
  };
  
  document.getElementById('emailForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const emailDetails = {
      email_name: document.getElementById('emailName').value,
      email_address: document.getElementById('emailAddress').value,
      receiver_email: [document.getElementById('receiverEmail').value],
      subject: document.getElementById('subject').value,
      text: document.getElementById('text').value,
      html: document.getElementById('html').value,
      host: document.getElementById('host').value,
      port: document.getElementById('port').value,
      secure: false,
      username: document.getElementById('username').value,
      email_password: document.getElementById('emailPassword').value,
      tls: false,
    };
  
    try {
      const response = await fetch(`${config.baseUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify(emailDetails),
      });
      const result = await response.json();
      console.log('Email sent successfully:', result);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
  
  document.getElementById('smsForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const smsDetails = {
      senderAddr: document.getElementById('senderAddr').value,
      recipient: [document.getElementById('recipient').value],
      msg: document.getElementById('msg').value,
      dndCategory: '1',
      expiryDt: new Date().toISOString(),
      desc: 'Test SMS',
      campaignName: 'Test Campaign',
      wapUrl: '',
    };
  
    try {
      const response = await fetch(`${config.baseUrl}/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify(smsDetails),
      });
      const result = await response.json();
      console.log('SMS sent successfully:', result);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  });
  
  document.getElementById('notificationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const notificationDetails = {
      channel: document.getElementById('channel').value,
      body: {
        title: document.getElementById('title').value,
        message: document.getElementById('message').value,
      },
    };
  
    try {
      const response = await fetch(`${config.baseUrl}/send-portal-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify(notificationDetails),
      });
      const result = await response.json();
      console.log('Portal notification sent successfully:', result);
    } catch (error) {
      console.error('Error sending portal notification:', error);
    }
  });
  