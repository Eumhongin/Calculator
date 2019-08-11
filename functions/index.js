const functions = require('firebase-functions');
const express = require('express');

const app = express();

var firebaseConfig = {
  apiKey: "AIzaSyDz3I3Am3Mf9d-tVXPsvt7rhtGW_whbcZ8",
  authDomain: "calculator-d5bb6.firebaseapp.com",
  databaseURL: "https://calculator-d5bb6.firebaseio.com",
  projectId: "calculator-d5bb6",
  storageBucket: "",
  messagingSenderId: "906615886232",
  appId: "1:906615886232:web:df634cc4926d39c9"
};

let firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

const database = firebase.database();


app.get('/message',(req,res) => {
  
  res.json({message : `well done!`})
  // res.send(`Hello world!`)
})

app.get('/getlist',(req,res) => {
  database.ref().once('value').then(snapshot => {
    return res.json(snapshot.val())
  })
})

app.post('/saveMoney',(req,res) => {
  res.send(`${Date.now()}`)
})

exports.api = functions.https.onRequest(app)