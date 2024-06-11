async function sendNotification(userId, title, body,product) {
    try {
      
      const url = `https://notification-ms.devnhr.com/v1/webpusher/sendNotification`;
      const headers = {
        'Content-Type': 'application/json',
      };
  
      
      const data = {
        userId,
        title,
        body,
        product
      };
  
      
      const response = await axios.post(url, data, { headers });
  
      if (response.data.success) {
        console.log('Notification sent successfully');
      } else {
        console.error('Failed to send notification:', response.data.message);
      }
    } catch (error) {
      console.error('Error sending notification:', error.message);
    }
  }

   sendNotification('67bcdecb85d38f7555efef30','Leave Request Created','A leave rqust has been created, check on the portal to view',`665db727e2d5fd22f529dbd8`)