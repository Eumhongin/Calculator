const functions = require('firebase-functions');
const express = require('express');

const app = express();


let paymentDutToDate = 15;
let creditCardCycle = 2;
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




// app.get('/getlist',(req,res) => {
//   database.ref().once('value').then(snapshot => {
//     return res.json(snapshot.val())
//   })
// })

app.post('/CreateMoneyCell',(req,res) => {
  const date = new Date();
  const yearLiteral = date.getFullYear() + '년'
  const MonthLiteral = 1 + date.getMonth()
  const DayLiteral = date.getDate()
  let isSpreadOut = req.body.SpentMoneySpreadOut !== '' && req.body.SpentMoneySpreadOut > 0 ? true : false;
  let MoneyInfo = {
    //년 월 일 금액 할부 어디에썼는지 작성자 수정됬는지 timestamp
    SpentYear: date.getFullYear(),
    SpentMonth: date.getMonth() + 1,
    SpentDay: date.getDate(),
    SpentMoneyPlace: req.body.SpentMoneyPlace,
    SpentMoney: req.body.SpentMoney,
    SpentMoneyDescription: req.body.SpentMoneyDescription,


  }
  // 할부일때랑 할부아닐때랑.
  if(isSpreadOut) {
    

    //할부 개월수 달아주고
    MoneyInfo.SpreadOut = req.body.SpentMoneySpreadOut
    // 할부 개월수 만큼 update해주고
    //원금을 할부 개월수만큼 나눠주고.
    const DividedMoneyBySpreadOut = parseInt(MoneyInfo.SpentMoney / MoneyInfo.SpreadOut)
    // Object에 넣어주고.
    MoneyInfo.SpreadOutMoney = DividedMoneyBySpreadOut



    console.log(`할부 개월수 : ${MoneyInfo.SpreadOut}개월`);
    console.log(`달마다 내야하는 돈  : ${DividedMoneyBySpreadOut}원`)
    



    for (let index = 1; index <= MoneyInfo.SpreadOut; index++) {
      
      database.ref(`${yearLiteral}/${MonthLiteral+index}월/SpreadOutPayment/${DayLiteral}`).once('value').then(snapshot => {
        if (snapshot.exists()) {
          

          snapshot.ref.update({
            [snapshot.numChildren()]: MoneyInfo
          })
        } else {
          snapshot.ref.update({
            0: MoneyInfo
          })


        }


        res.send('<script>alert("Success!!");location.href="./";</script>')

      }).catch(err => {
        res.status(400).json({error : err.code})
      })
      
    }

    // res.json(MoneyInfo)

  } else {
    console.log(yearLiteral)
    console.log(MonthLiteral)
    database.ref(`${yearLiteral}/${MonthLiteral}월/DirectPayment/${DayLiteral}`).once('value').then(snapshot => {
      if(snapshot.exists()) {
        console.log(snapshot.numChildren());
        
        snapshot.ref.update({
          [snapshot.numChildren()]: MoneyInfo
        })
      } else {
        snapshot.ref.update({
          0 : MoneyInfo
        })

        
      }
      
      
      res.send('<script>alert("Success!!");location.href="./";</script>')
      
    })

    // // res.json({
    // //   year: `${date.getFullYear()}`,
    // //   month: `${date.getMonth()}`,
    // //   day: `${date.getDate()}`
    // // })
    // res.json(MoneyInfo)
    // database.ref(`${yearLiteral}/${MonthLiteral}`).update({
    //   MoneyInfo
    // })
  }
  
  
  

  
})

exports.api = functions.https.onRequest(app)