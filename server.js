"use strict";
const webpush = require("web-push");


const dotenv = require('dotenv');
dotenv.config();
const Subscription = require('../../models/subscription');
const Product = require('../../models/subscription');
const Notification = require('../../models/subscription');
const notification = require("../../models/notification");




webpush.setVapidDetails(
  `mailto:${process.env.Nathan_Email}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);



const subscribe = async (req, res) => {
  const { userId, subscription } = req.body;

  try {
    let existingSubscription = await Subscription.findOne({ userId, 'subscription.endpoint': subscription.endpoint });
    if (!existingSubscription) {
      const newSubscription = new Subscription({ userId, subscription });
      await newSubscription.save();
    }
    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Failed to save subscription', error: error.message });
  }
};

const sendNotification = async (req, res) => {
  let { userId, title, body = {} } = req.body;
  // console.log({ userId, title, body })

  try {
    const userSubscriptions = await Subscription.find({ userId });
    // console.log(userSubscriptions);
    const payload = JSON.stringify({ title, body, });

    userSubscriptions.forEach(subscription => {

    
      const newNotification = Notification.create({userId,title,body,subscription:subscription._id});
       newNotification.save();
      webpush.sendNotification(subscription.subscription, payload).catch(error => console.error('Error sending notification', error));
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send notifications', error: error.message });
  }
};

const getNoficationsForUser = async(req,res)=>{
  try{
const notifications = await Notification.find(req.params.id)
if(notification.length==0){
  return res.json({message:"No notifications found for this user"});

  
}
res.status(200).json({succes:true, data:notifications});
  } catch(err){
    console.error(err);
    res.status(500).json({success:false,message:'Failed to get notifications',error:err.message});
  }
};

const getNoficationsForProduct = async(req,res) =>{
  try{
    const notifications = await Notification.find(req.params.id)
    if(notification.length==0){
      return res.json({message:"No notifications found for this product"});
    }
    res.status(200).json({succes:true, data:notifications});

  } catch(err){
    console.error(err);
    res.status(500).json({success:false,message:'Failed to get notifications',error:err.message});
  }
};
 



module.exports = { subscribe, sendNotification, getNoficationsForUser, getNoficationsForProduct }



